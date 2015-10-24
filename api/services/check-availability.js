var deferred = require('deferred');
var staffListModel = require('../models/staffList');
var commonServices = require('./common-services')();
var distanceMatrixService = require('./distance-matrix-service')();

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
                var staffObj = getNearestStaff(originCords, staffList);
                console.log("distance", staffObj.distance);
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

    var getServiceAvailabilty = function (originCords) {
        var q = deferred();
        getAvailableStaff(originCords).then(function (data) {
            console.log("distance B/w them", data.distance);
            if(data.distance < 50000)
                q.resolve(data);
            else
                q.reject(data.distance +"meters away");
        }, function(data){
            q.reject("Staff Not available");
        });
        return q.promise;
    };

    return {
        getAvailableStaff : getAvailableStaff,
        getServiceAvailabilty : getServiceAvailabilty
    }
};