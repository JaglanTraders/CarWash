var deferred = require('deferred');
var userDetailsModel = require('../models/userDetails');
var loginDetailsModel = require('../models/loginDetails');
var commonServices = require('../services/common-services')();
var authenticationApi = require('./authentication-api')();
var orderService = require('../services/order-service')();
var emailService = require('../services/send-email-service')();

module.exports = function () {

    var loginResponseObj = function (userObj) {
        var q= deferred();
        orderService.getOpenOrderForUser(userObj.id).then(function (response) {
            var obj = {
                userId : userObj.id,
                userName : userObj.name,
                openOrder : true
            };
            q.resolve(obj);
        }, function (response) {
            var obj = {
                userId : userObj.id,
                userName : userObj.name,
                openOrder : false
            };
            q.resolve(obj);
        });
        return q.promise;
    };

    var loginAuth = function (req, res) {
        console.log("recieved login Auth Req", req.body);
        console.log("Ip Address", req.ip);
        emailService.sendMail();
        userDetailsModel.findOne({email : req.body.userId, password : req.body.password}, function (err, docs) {
            console.log(docs);
            if(err)
                return res.send(err);
            if (docs != null) {
                authenticationApi.setUserObj(req, docs);
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
                loginResponseObj(authenticationApi.getUserObj(req)).then(function (response) {
                    res.send(response);
                });
            }
            else
                return res.status(404).send(commonServices.onErrorJson("Invalid UserId / Password"));
        });
    };

    return {
        loginAuth : loginAuth
    }
};