var controller;
var userDetailsModel = require('../models/userDetails');
var commonServices = require('../services/common-services')();

module.exports = function () {
    var signUp = function (req, res) {
        console.log("recieved signUp Req", req.body);
        if(req.body.email == null || req.body.name == null || req.body.mobile == null || req.body.password == null || req.body.termsAndCondition == null || req.body.termsAndCondition == false)
            return res.status(404).send(commonServices.onErrorJson("Invalid/Incomplete Information"));

        commonServices.isEmailIdExist(req.body.email).then(function (data) {
            saveData();
        }, function (data) {
            return res.status(404).send(commonServices.onErrorJson("Email Id is already registered"));
        });
        var saveData = function () {
            commonServices.getNewUniqueUserId().then(function (data) {
                var user = new userDetailsModel({
                    id: data,
                    name: req.body.name,
                    email: req.body.email,
                    role: "user",
                    password: req.body.password,
                    signUpDate: new Date().toISOString(),
                    mobile: req.body.mobile,
                    tncAccepted : req.body.termsAndCondition
                });
                user.save(function (err) {
                    if (err)
                        return res.send(err);
                    else
                        return res.send(commonServices.onSuccessJson("Registered Successfully"));
                });
            });
        };
    };

    return {
        signUp : signUp
    }
};