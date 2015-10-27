var commonServices = require('../services/common-services')();
var authenticationApi = require('./authentication-api')();
var staffListModel = require('../models/staffList');
var orderListModel = require('../models/ordersList');
var staffService = require('../services/staff-service')();
var orderService = require('../services/order-service')();
var emailService = require('../services/send-email-service')();

module.exports = function () {
    var cancelOrder = function (req, res) {
        var orderId = req.body.orderId;
        if(orderId != null){
            orderService.cancelOrder(orderId).then(function (orderObj) {
                var assignedStaffId = orderObj.assignedStaffId;
                staffService.changeStaffAvailabilityStatus(assignedStaffId, true).then(function (response) {
                    var userObj = authenticationApi.getUserObj(req);
                    emailService.sendMailOnCancelOrder(userObj, orderObj);
                    res.send(commonServices.onSuccessJson("Order Cancelled Successfully"));
                }, function (response) {
                    res.send(commonServices.onSuccessJson("Order Cancelled. But staff status not updated"));
                });
            }, function (response) {
                res.status(404).send(commonServices.onErrorJson(response));
            });
        }
        else
            res.status(404).send(commonServices.onErrorJson("Invalid orderId"));

    };

    return {
        cancelOrder : cancelOrder
    }
};