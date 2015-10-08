(function () {
    angular.module("carwash.myServices").factory('apiMethods', function ($http) {

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