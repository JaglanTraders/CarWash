var commonServices = require('../services/common-services')();

module.exports = function () {
    var excludeRoutes = [
        "/login",
        "/signUp",
        "/forgot-password"
    ];
    var checkAuthentication = function (req, res, next) {
        var index = excludeRoutes.indexOf(req.url);
        if(index == -1 && req.session.userObj == null){
            res.status(403).send({message: "Unauthorized access"});
        }
        else{
            next();
        }
    };
    
    var isLoggedIn = function (req, res) {
        if(req.session != null){
            if(req.session.userObj != null)
                res.send(commonServices.onSuccessJson(true));
            else
                res.send(commonServices.onSuccessJson(false));
        }
        else
            res.send(commonServices.onSuccessJson(true));
    };
    
    var setUserObj = function (req, userObj) {
        req.session.userObj = userObj;
    };

    var getUserObj = function (req) {
        return req.session.userObj;
    };

    var destroySession = function (req) {
        req.session.destroy();
    };

    return {
        checkAuthentication : checkAuthentication,
        setUserObj : setUserObj,
        getUserObj : getUserObj,
        destroySession : destroySession,
        isLoggedIn : isLoggedIn
    }
};