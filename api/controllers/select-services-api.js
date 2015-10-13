var controller;
var serviceTypesModel = require('../models/serviceTypes');
var commonServices = require('../services/common-services')();

module.exports = function () {
    var getServiceTypes = function (req, res) {
        console.log("recieved login Auth Req", req.body);
        console.log("Ip Address", req.ip);
        serviceTypesModel.find(function (err, docs) {
            if(err)
                return res.send(err);
            if (docs != null) {
                return res.send(docs);
            }
            else
                return res.status(404).send(commonServices.onErrorJson("Invalid UserId / Password"));
        });
    };

    return {
        getServiceTypes : getServiceTypes
    }
};