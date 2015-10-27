var deferred = require('deferred');
var staffListModel = require('../models/staffList');
var commonServices = require('./common-services')();
var distanceMatrixService = require('./distance-matrix-service')();
var email   = require("emailjs/email");
module.exports = function () {
    
    var sendMail = function () {

        var server  = email.server.connect({
            user:    "jagdeep.singh@talentica.com",
            password:"Welcome28",
            host:    "smtp.outlook.com",
            ssl:     true
        });

        // send the message and get a callback with an error or details of the message that was sent
        server.send({
            text:    "i hope this works",
            from:    "jagdeep.singh@talentica.com",
            to:      "singh.jagdeep91@gmail.com, jagdeep.singh@talentica.com",
            subject: "testing emailjs"
        }, function(err, message) { console.log("****"+err || message); });
    };
    
    return {
        sendMail : sendMail
    }
};