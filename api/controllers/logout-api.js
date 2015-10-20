var commonServices = require('../services/common-services')();
var authenticationApi = require('./authentication-api')();

module.exports = function () {
    var doLogout = function (req, res) {
        authenticationApi.destroySession(req);
        res.send(commonServices.onSuccessJson("Logged out successfully"));
    };

    return {
        doLogout : doLogout
    }
};