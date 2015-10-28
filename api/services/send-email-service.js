var deferred = require('deferred');
var staffListModel = require('../models/staffList');
var commonServices = require('./common-services')();
var distanceMatrixService = require('./distance-matrix-service')();

var nodemailer = require('nodemailer');
module.exports = function () {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: 'ilacarcare@gmail.com',
            pass: 'Welcome@01'
        }
    });

    var mailOptions = function(mailTo, subject, body){
        var bodySignature = '<br/><br/><b>Regards</b><br/><b>iLA Car Care</b>';
        return {
            from: 'iLA Car Care <ilacarcare@gmail.com>', // sender address
            to: mailTo, // list of receivers
            subject: subject, // Subject line
            html: body +""+bodySignature // plaintext body
        };
    };

    var sendMailOnSignUp = function (userObj) {
        var subject = "Welcome to iLA Car Care :)";
        var body = 'Hello '+userObj.name+', <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Welcome to iLA Car Care';
        var mailTo = userObj.email;
        transporter.sendMail(mailOptions(mailTo, subject, body), function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    };

    var sendMailOnPlaceOrder = function (userObj, orderObj) {
        var subject = "Your order of Rs. "+orderObj.amount+" /- has been placed successfully";
        var body = 'Hello '+userObj.name+', ' +
            '<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Congratulations ! Your order has been placed successfully.<br/>'+
            'Your expected pick up time is '+orderObj.expectedPicUpTime;
        var mailTo = userObj.email;
        transporter.sendMail(mailOptions(mailTo, subject, body), function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    };

    var sendMailOnCancelOrder = function (userObj, orderObj) {
        var subject = "Your order of Rs. "+orderObj.amount+" /- has been Canceled.";
        var body = 'Hello '+userObj.name+', ' +
            '<br/><br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your order has been Canceled successfully.<br/>';
        var mailTo = userObj.email;
        transporter.sendMail(mailOptions(mailTo, subject, body), function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    };

    var sendForgotPasswordMail = function (userObj) {
        var subject = "Regarding your forgot password request.";
        var body = 'Hello '+userObj.name+', ' +
            '<br/><br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As per your request for forgot password,'+
            ' below are the login details for your account with us.<br/><br/>Email Id : <b>'+userObj.email+'</b>'+
                '<br/>Password : <b>'+userObj.password+'</b>';
        var mailTo = userObj.email;
        transporter.sendMail(mailOptions(mailTo, subject, body), function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    };


    return {
        sendMailOnSignUp : sendMailOnSignUp,
        sendMailOnPlaceOrder : sendMailOnPlaceOrder,
        sendMailOnCancelOrder : sendMailOnCancelOrder,
        sendForgotPasswordMail : sendForgotPasswordMail
    }
};