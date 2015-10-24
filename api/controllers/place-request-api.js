var deferred = require('deferred');
var staffListModel = require('../models/staffList');
var placeOrderModel = require('../models/ordersList');
var commonServices = require('../services/common-services')();
var distanceMatrixService = require('../services/distance-matrix-service')();
var authenticationApi = require('./authentication-api')();

module.exports = function () {
    var getAvailableStaffList = function (originCords) {
        var userLat = parseFloat(originCords.lat);
        var userLng = parseFloat(originCords.lng);
        console.log("user lat Lng : ", userLat, userLng);
        var q = deferred();
        staffListModel.find({serviceAvailabilty : true}, function (err, docs) {
            console.log("available staff List", docs);
            var shortlistedStaffList = [];
            if(err)
                q.reject(err);
            else if(docs == null || docs == []){
                q.reject(null);
            }
            else{
                for(var i=0;i< docs.length; i++){
                    var locListLength = docs[i].locationList.length;
                    var lat = parseFloat(docs[i].locationList[locListLength-1].position.lat);
                    var lng = parseFloat(docs[i].locationList[locListLength-1].position.lng);
                    console.log("staff Lat Lng : ", lat, lng);
                    if(lat <= userLat+2 && lat >= userLat-2){
                        if(lng <= userLng+2 && lng >= userLng-2){
                            shortlistedStaffList.push(docs[i]);
                        }
                    }
                }
                console.log("shortlisted Staff list", shortlistedStaffList);
                q.resolve(shortlistedStaffList);
            }
        });
        return q.promise;
    };
    var getNearestStaff = function (originCords, staffList) {
        var nearestStaff = staffList[0];
        var len = staffList[0].locationList.length;
        var pos = staffList[0].locationList[len-1].position;
        nearestStaff.distance = distanceMatrixService.getDistanceBetweenTwoCords(originCords, pos);
        console.log("0 index staff distance", nearestStaff.distance);
        for(var i=0;i<staffList.length; i++){
            var locListLength = staffList[i].locationList.length;
            var staffCords = staffList[i].locationList[locListLength-1].position;
            var distance = distanceMatrixService.getDistanceBetweenTwoCords(originCords, staffCords);
            console.log("new distance", distance);
            if(distance < nearestStaff.distance){
                nearestStaff = staffList[i];
                nearestStaff.distance = distance;
            }
        }
        return nearestStaff;
    };
    var getAvailableStaff = function (originCords) {
        var q = deferred();
        getAvailableStaffList(originCords).then(function (staffList) {
            if(staffList != null && staffList.length != 0) {
                console.log("available staff List haha" , staffList);
                var staffObj = getNearestStaff(originCords, staffList);
                console.log("staff obj", staffObj);
                q.resolve(staffObj);
            }
            else{
                q.reject(null);
            }
        }, function (data) {
            q.reject(null);
        });
        return q.promise;
    };

    var placeOrder = function (reqObj, userObj, staffObj) {
        var q = deferred();
        var time;
        var originArr = [reqObj.picUpLatLng.lat +","+ reqObj.picUpLatLng.lng];
        var staffLocObj = staffObj.locationList[staffObj.locationList.length-1].position;
        var destArr = [staffLocObj.lat + "," + staffLocObj.lng];
        distanceMatrixService.getDistanceMatrixObjFromGoogle(originArr, destArr).then(function (response) {
            time = response.rows[0].elements[0].duration.text;
            addOrderToDB();
        }, function (response) {
            res.status(404).send(commonServices.onErrorJson("error"));
            time = "Can't calculate";
            addOrderToDB();
        });
        var addOrderToDB = function () {
            commonServices.getNewUniqueOrderId().then(function (id) {
                var addOrder = new placeOrderModel({
                    orderId: id,
                    orderDateTime: new Date().toISOString(),
                    orderLocation: reqObj.picUpLatLng,
                    houseNo: reqObj.houseNo,
                    userId: userObj.id,
                    vendorId: staffObj.vendorId,
                    assignedStaffId: staffObj.staffId,
                    expectedPicUpTime : time,
                    packageId: reqObj.packageCatId,
                    promoCode: reqObj.appliedPromoCode,
                    amount: reqObj.packageDiscountedPrice,
                    paymentMode: reqObj.paymentMode,
                    paymentStatus: "Pending",
                    orderStatus: "Pending",
                    userComments: null,
                    staffComments: null,
                    userRating: null,
                    staffRating: null
                });
                addOrder.save(function (err) {
                    if (err) {
                        console.log("error while saving in login details" + err);
                        q.reject("Could not able to place order. Please Try again");
                    }
                    else {
                        q.resolve(time);
                    }
                });
            }, function (data) {
                q.reject("Could not able to place order. Please Try again");
            });
        };
        return q.promise;
    };

    var placeRequest = function (req, res) {
        console.log("req body cords", req.body.picUpLatLng);
        getAvailableStaff(req.body.picUpLatLng).then(function (staffObj) {
            if(staffObj != null){
                var userObj = authenticationApi.getUserObj(req);
                placeOrder(req.body, userObj, staffObj).then(function (time) {
                    var resObj = {
                        staffId : staffObj.staffId,
                        staffName : staffObj.name,
                        staffMobile : staffObj.mobile,
                        expectedTime : time
                    };
                    res.send(resObj);
                }, function (data) {
                    res.status(403).send(commonServices.onErrorJson("Request Failed. Please try again."))
                });
            }
            else{
                res.status(404).send(commonServices.onErrorJson("Our all executives are busy at this time. Please try after some time"));
            }
        }, function (data) {
            res.status(404).send(commonServices.onErrorJson("Our all executives are busy at this time. Please try after some time"));
        });
    };

    return {
        placeRequest : placeRequest
    }
};