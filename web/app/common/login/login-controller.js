(function () {
    angular.module('carwash.myControllers').controller('carwash.common.login.loginController',[
        '$scope',
        '$state',
        'carwash.services.apiUrlConfig',
        'carwash.services.apiMethods',
        'carwash.common.login.loginModel',
        function ($scope, $state, apiUrlConfig, apiMethods, loginModel) {
        
        $scope.onLoginClick = function () {
            var url = apiUrlConfig.login;
            var reqObj = $scope.login;
            apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                console.log("success", response);
                $state.go("home");
            }, function (response) {
                console.log("failure", response);
                alert("error");
            });
        };

        $scope.onForgotPassSubmitClick = function(){
            var url = apiUrlConfig.forgotPassword;
            var reqObj = $scope.forgotPassword;
            apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                console.log("service success !!!!!");
                
            }, function(response){
                console.log("service failure !!!!!");
                console.log(response);
            });
        };

        $scope.forgotPasswordClick = function(){
            $scope.forgotPasswordDiv = true;
        }
    }]);
})();