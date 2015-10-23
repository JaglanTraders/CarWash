var staffListModel = require('../models/staffList');
var commonServices = require('../services/common-services')();
var distanceMatrixService = require('../services/distance-matrix-service')();

module.exports = function () {
    var placeRequest = function (req, res) {
        var origion = ["18.5596581, 73.7799374"];
        var destination = ["28.635308, 77.22496"];
        distanceMatrixService.getDistanceMatrixObj(origion, destination).then(function (data) {
            console.log(data);
            res.send(data);
        }, function (data) {
            res.status(403).send(data);
        });
        //res.send(commonServices.onSuccessJson("Request Placed"));
    };

    return {
        placeRequest : placeRequest
    }
};