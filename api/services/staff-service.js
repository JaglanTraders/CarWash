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
        staffListModel.find({serviceAvailability : true}, function (err, docs) {
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

    var changeStaffAvailabilityStatus = function (staffId, status) {
        var q = deferred();
        var options = { safe: true };
        console.log("staff Id", staffId);
        staffListModel.update({staffId : staffId}, { serviceAvailability: status }, options, function (err, numAffected) {
            console.log("first Argument", err);
            console.log("second Args", numAffected);
            if(numAffected.n !=0){
                q.resolve("updated");
            }
            else{
                q.reject("not updated");
            }
        });
        return q.promise;
    };

    var getStaffObj = function (staffId) {
        var q = deferred();
        staffListModel.findOne({staffId : staffId}, function (err, doc) {
            if(err){
                q.reject();
            }
            else if(doc == null){
                q.reject();
            }
            else{
                q.resolve(doc);
            }
        });
        return q.promise;
    };

    return {
        getAvailableStaff : getAvailableStaff,
        changeStaffAvailabilityStatus : changeStaffAvailabilityStatus,
        getStaffObj : getStaffObj
    }
};