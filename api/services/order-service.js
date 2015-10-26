var deferred = require('deferred');
var staffListModel = require('../models/staffList');
var orderListModel = require('../models/ordersList');
var commonServices = require('./common-services')();
var distanceMatrixService = require('./distance-matrix-service')();

module.exports = function () {

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
                var orderObj = {
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
                };
                var addOrder = new orderListModel(orderObj);
                addOrder.save(function (err) {
                    if (err) {
                        console.log("error while saving in login details" + err);
                        q.reject("Could not able to place order. Please Try again");
                    }
                    else {
                        q.resolve(orderObj);
                    }
                });
            }, function (data) {
                q.reject("Could not able to place order. Please Try again");
            });
        };
        return q.promise;
    };

    var cancelOrder = function (orderId) {
        var q = deferred();
        orderListModel.findOne({orderId : orderId}, function (err, doc) {
            if(err){
                q.reject("Order Not found");
            }
            else if(doc != null){
                var staffId = doc.assignedStaffId;
                doc.orderStatus = "cancelled";
                doc.save(function (err) {
                    if(err){
                        q.reject("Could not update order status");
                    }
                    else{
                        q.resolve(staffId);
                    }
                });
            }
            else{
                q.reject("Order Not found");
            }
        });
        return q.promise;
    };

    var orderConfirmationResponseObj = function (staffObj, orderObj) {
        return {
            staffId : staffObj.staffId,
            staffName : staffObj.name,
            staffMobile : staffObj.mobile,
            expectedTime : orderObj.expectedPicUpTime,
            orderId : orderObj.orderId
        };
    };

    var getOpenOrderForUser = function (userId) {
        var q = deferred();
        orderListModel.findOne({userId : userId, orderStatus : "Pending"}, function (err, doc) {
            if(err){
                q.reject(false);
            }
            else if(doc != null){
                q.resolve(doc);
            }
            else{
                q.reject(false);
            }
        });
        return q.promise;
    };

    return {
        placeOrder : placeOrder,
        cancelOrder : cancelOrder,
        orderConfirmationResponseObj : orderConfirmationResponseObj,
        getOpenOrderForUser : getOpenOrderForUser
    }
};