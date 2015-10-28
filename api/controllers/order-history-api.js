var deferred = require('deferred');
var commonServices = require('../services/common-services')();
var authenticationApi = require('./authentication-api')();
var orderModel = require('../models/ordersList');
var serviceTypesModel = require('../models/serviceTypes');

module.exports = function () {

    var orderHistoryResObj = function (obj) {
        return {
            orderId : obj.orderId,
            orderDateTime : obj.orderDateTime,
            orderLocation : obj.orderLocation,
            houseNo : obj.houseNo,
            vendorId : obj.vendorId,
            assignedStaffId : obj.assignedStaffId,
            expectedPicUpTime : obj.expectedPicUpTime,
            packageId : obj.packageId,
            promoCode : obj.promoCode,
            amount : obj.amount,
            paymentMode : obj.paymentMode,
            paymentStatus : obj.paymentStatus,
            orderStatus : obj.orderStatus,
            userComments : obj.userComments,
            staffComments : obj.staffComments,
            userRating : obj.userRating,
            staffRating : obj.staffRating
        }
    };
    
    var getOrderHistoryList = function (userObj) {
        var q = deferred();
        orderModel.find({userId : userObj.id}, function (err, doc) {
            if(err)
                q.reject("No Order Found");
            else if(doc != null && doc.length == 0){
                q.resolve([]);
            }
            else{
                var arr = [];
                for(var i=0; i<doc.length;i++){
                    var obj = orderHistoryResObj(doc[i]);
                    arr.push(obj);
                }
                q.resolve(arr);
            }
        });
        return q.promise;
    };
    
    var getOrderHistory = function (req, res) {
        var userObj = authenticationApi.getUserObj(req);
        getOrderHistoryList(userObj).then(function (response) {
            res.send(response);
        }, function (response) {
            res.status(404).send(commonServices.onErrorJson(response));
        });
    };

    return {
        getOrderHistory : getOrderHistory
    }
};