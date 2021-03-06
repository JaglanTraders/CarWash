var userDetailsModel = require('../models/userDetails');
var deferred = require('deferred');

module.exports = function () {
    var onErrorJson = function (msg) {
        return {
            message : msg
        }
    };

    var onSuccessJson = function (msg) {
        return {
            message : msg
        }
    };

    var isUserIdExist = function (userId) {
        var q = deferred();
        userDetailsModel.findOne({id : userId}, function (err, doc) {
            if(doc != null) {
                q.reject(true);
            }
            else {
                q.resolve(false);
            }
        });
        return q.promise;
    };

    var isEmailIdExist = function (email) {
        var q = deferred();
        userDetailsModel.findOne({email : email}, function (err, doc) {
            if(doc != null) {
                q.reject(true);
            }
            else {
                q.resolve(false);
            }
        });
        return q.promise;
    };
    
    var getNewUniqueUserId = function () {
        var q = deferred();
        userDetailsModel.find(function (err, doc) {
            var id = doc.length;
            var result = function (uid) {
                isUserIdExist(uid).then(function (data) {
                    q.resolve(uid);
                }, function (data) {
                    result(uid+1);
                });
            };
            result(id);
        });
        return q.promise;
    };

    return {
        onErrorJson : onErrorJson,
        onSuccessJson : onSuccessJson,
        getNewUniqueUserId : getNewUniqueUserId,
        isEmailIdExist : isEmailIdExist
    }
};