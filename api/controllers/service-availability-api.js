var controller;
var voucherListModel = require('../models/voucherList');
var commonServices = require('../services/common-services')();
var checkAvailability = require('../services/check-availability')();

module.exports = function () {
    var checkServiceAvailability = function (req, res) {
        checkAvailability.getServiceAvailabilty(req.body.picUpLatLng).then(function (response) {
            //res.send(commonServices.onSuccessJson("Service Available"));
            res.send(response);
        }, function (response) {
            res.status(404).send(commonServices.onErrorJson("Service not Available"));
        });
    };

    return {
        checkServiceAvailability : checkServiceAvailability
    }
};