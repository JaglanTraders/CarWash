(function () {
    angular.module("carwash.myServices").factory('myHttpInterceptor',[
        '$q',
        '$injector',
        function ($q, $injector) {

            var showLoading = function(){
                document.getElementById("loadingDiv").style.visibility = "visible";
            };

            var hideLoading = function () {
                document.getElementById("loadingDiv").style.visibility = "hidden";
            };

            return {
                // optional method
                'request': function (config) {
                    // do something on success
                    showLoading();
                    return config;
                },

                // optional method
                'requestError': function (rejection) {
                    // do something on error
                    var $http = $http || $injector.get( '$http' );
                    if(!$http.pendingRequests.length)
                        hideLoading();
                    return $q.reject(rejection);
                },


                // optional method
                'response': function (response) {
                    // do something on success
                    var $http = $http || $injector.get( '$http' );
                    if(!$http.pendingRequests.length)
                        hideLoading();
                    return response;
                },

                // optional method
                'responseError': function (rejection) {
                    console.log("On Failure");
                    console.log(rejection);
                    // do something on error
                    var $http = $http || $injector.get( '$http' );
                    if(!$http.pendingRequests.length)
                        hideLoading();
                    if(rejection.data != null && rejection.data != undefined) {
                        if (rejection.data.message == "Unauthorized access") {
                            localStorage.clear();
                        }
                    }
                    return $q.reject(rejection);
                }
            };
        }
    ]);
})();

