var controller;
var userDetailsModel = require('../models/userDetails');
var loginDetailsModel = require('../models/loginDetails');
var commonServices = require('../services/common-services')();

module.exports = function () {
    var loginAuth = function (req, res) {
        console.log("recieved login Auth Req", req.body);
        console.log("Ip Address", req.ip);
        userDetailsModel.findOne({email : req.body.userId, password : req.body.password}, function (err, docs) {
            console.log(docs);
            if(err)
                return res.send(err);
            if (docs != null) {
                var loginStats = new loginDetailsModel({
                    id : docs.id,
                    email : docs.email,
                    date : new Date().toISOString(),
                    ipAddress : req.ip
                });
                loginStats.save(function (err) {
                    if(err)
                        console.log("error while saving in login details"+ err);
                });
                return res.send(commonServices.onSuccessJson("Login Success"));
            }
            else
                return res.status(404).send(commonServices.onErrorJson("Invalid UserId / Password"));
        });
    };

    return {
        loginAuth : loginAuth
    }
};