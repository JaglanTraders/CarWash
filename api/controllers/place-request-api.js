var deferred = require('deferred');
var staffListModel = require('../models/staffList');
var placeOrderModel = require('../models/ordersList');
var commonServices = require('../services/common-services')();
var orderService = require('../services/order-service')();
var staffService = require('../services/staff-service')();
var distanceMatrixService = require('../services/distance-matrix-service')();
var authenticationApi = require('./authentication-api')();
var emailService = require('../services/send-email-service')();

module.exports = function () {
    var placeRequest = function (req, res) {
        console.log("req body cords", req.body.picUpLatLng);
        staffService.getAvailableStaff(req.body.picUpLatLng).then(function (staffObj) {
            if(staffObj != null){
                var userObj = authenticationApi.getUserObj(req);
                orderService.placeOrder(req.body, userObj, staffObj).then(function (orderObj) {
                    staffService.changeStaffAvailabilityStatus(staffObj.staffId, false).then(function (response) {
                        var resObj = orderService.orderConfirmationResponseObj(staffObj, orderObj);
                        emailService.sendMailOnPlaceOrder(userObj, orderObj);
                        res.send(resObj);
                    },function(response){
                        var resObj = orderService.orderConfirmationResponseObj(staffObj, orderObj);
                        res.send(resObj);
                    });
                }, function (data) {
                    res.status(403).send(commonServices.onErrorJson("Request Failed. Please try again."));
                });
            }
            else{
                res.status(404).send(commonServices.onErrorJson("Our all executives are busy at this time. Please try after some time"));
            }
        }, function (data) {
            res.status(404).send(commonServices.onErrorJson("Our all executives are busy at this time. Please try after some time"));
        });
    };

    var getOpenOrderDetails = function (req, res) {
        var userObj = authenticationApi.getUserObj(req);
        orderService.getOpenOrderForUser(userObj.id).then(function (orderObj) {
            staffService.getStaffObj(orderObj.assignedStaffId).then(function (staffObj) {
                var responseObj = orderService.orderConfirmationResponseObj(staffObj, orderObj);
                res.send(responseObj);
            }, function (response) {
                res.status(404).send(commonServices.onErrorJson("Error Something wrong happened"));
            });
        }, function (response) {
            res.status(404).send(commonServices.onErrorJson("No order Found"));
        });
    };

    return {
        placeRequest : placeRequest,
        getOpenOrderDetails : getOpenOrderDetails
    }
};