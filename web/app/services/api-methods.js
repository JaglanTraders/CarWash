(function () {
    angular.module("carwash.application").factory('carwash.services.apiMethods', function ($http) {
        // var getHeaders = function () {
        //     return {
        //         "Content-Type" : "application/json",
        //         "Access-Control-Allow-Origin" : "*",
        //         "Access-Control-Allow-Methods" : "'GET, POST, OPTIONS, PUT, PATCH, DELETE'",
        //         "Access-Control-Allow-Headers" : "X-Requested-With,content-type",
        //         "Access-Control-Allow-Credentials" : true
        //     }
        // };

        return {
            apiGETReq : function (url, obj) {
                return $http({
                    method: 'GET',
                    url: url,
                    params: obj,
                    //headers: getHeaders()
                });
            },
            apiPOSTReq : function (url, obj) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: obj
                    //headers: getHeaders()
                });
            }
        }
    });
})();