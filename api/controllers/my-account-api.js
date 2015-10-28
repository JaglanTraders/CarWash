var deferred = require('deferred');
var authenticationApi = require('./authentication-api')();
var userDetailsModel = require('../models/userDetails');
var commonServices = require('../services/common-services')();
var emailService = require('../services/send-email-service')();

module.exports = function () {

    var accountResObj = function (userObj) {
        return {
            id : userObj.id,
            emailId : userObj.email,
            name : userObj.name,
            mobile : userObj.mobile
        }
    };

    var getMyAccountDetails = function (req, res) {
        var userObj = authenticationApi.getUserObj(req);
        var resObj = accountResObj(userObj);
        res.send(resObj);
    };

    var updateMyAccount = function (userId, reqObj) {
        var q = deferred();
        userDetailsModel.findOne({id : userId}, function (err, doc) {
            if(doc != null){
                doc.name = reqObj.name || doc.name;
                doc.mobile = reqObj.mobile || doc.mobile;
                doc.save(function (err) {
                    if(err){
                        q.reject("could not able to update account");
                    }
                    else{
                        q.resolve(doc);
                    }
                });
            }
            else{
                q.reject("no user found");
            }
        });
        return q.promise;
    };
    
    var saveMyAccount = function (req, res) {
        var userId = req.body.id;
        var userObjFromSession = authenticationApi.getUserObj(req);
        if(userId == null || userObjFromSession.id != userId){
            res.status(403).send(commonServices.onErrorJson("Invalid request"));
        }
        else{
            updateMyAccount(userId, req.body).then(function (response) {
                authenticationApi.setUserObj(req, response);
                res.send(commonServices.onSuccessJson("Account updated successfully"));
            }, function (response) {
                res.status(403).send(commonServices.onErrorJson(response));
            });
        }
    };

    var verifyAndUpdatePassword = function (userId, passObj) {
        var q = deferred();
        userDetailsModel.findOne({id : userId, password : passObj.oldPassword}, function (err, doc) {
            if(doc != null){
                doc.password = passObj.newPassword || doc.password;
                doc.save(function (err) {
                    if(err){
                        q.reject("could not able to update password");
                    }
                    else{
                        q.resolve(doc);
                    }
                });
            }
            else{
                q.reject("Old Password Not matching");
            }
        });
        return q.promise;
    };

    var changePassword = function (req, res) {
        var userId = authenticationApi.getUserObj(req).id;
        verifyAndUpdatePassword(userId, req.body).then(function (response) {
            res.send(commonServices.onSuccessJson("Password Changed Successfully"));
        }, function (response) {
            res.status(404).send(commonServices.onErrorJson(response));
        });
    };

    var sendForgotPasswordMail = function (userId) {
        var q = deferred();
        userDetailsModel.findOne({id : userId}, function (err, doc) {
            if(doc != null){
                doc.password = passObj.newPassword || doc.password;
                doc.save(function (err) {
                    if(err){
                        q.reject("could not able to update password");
                    }
                    else{
                        q.resolve(doc);
                    }
                });
            }
            else{
                q.reject("Old Password Not matching");
            }
        });
    };

    var forgotPasswordApi = function (req, res) {
        var userId = req.body.userId;
        if(userId == null || userId == ""){
            res.status(404).send(commonServices.onErrorJson("Invalid Request"));
        }
        else{
            userDetailsModel.findOne({email : userId}, function (err, doc) {
                if(doc != null){
                    emailService.sendForgotPasswordMail(doc);
                    res.send(commonServices.onSuccessJson("An Email with your password detail has been send to your registered email id"))
                }
                else if(doc == null){
                    res.status(404).send(commonServices.onErrorJson("This email id doesn't exist"));
                }
                else{
                    res.status(404).send(commonServices.onErrorJson("This email id doesn't exist"));
                }
            });
        }
    };

    return {
        getMyAccountDetails : getMyAccountDetails,
        saveMyAccount : saveMyAccount,
        changePassword : changePassword,
        forgotPasswordApi : forgotPasswordApi
    }
};