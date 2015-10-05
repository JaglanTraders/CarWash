(function () {
    angular.module('carwash.common').controller('carwash.common.login.loginController',['$scope', '$state', 'carwash.services.apiUrlConfig', 'carwash.services.apiMethods', 'carwash.common.login.loginModelService', function ($scope, $state, apiUrlConfig, apiMethods, loginModel) {
        
        $scope.onLoginClick = function () {
            console.log("login clicked");
            var url = apiUrlConfig.login;
            var reqObj = $scope.login;
            apiMethods.apiPOSTReq("/login", reqObj).then(function (response) {
                console.log("success", response);
            }, function (response) {
                console.log("failure", response);
            });
            //apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
            //    console.log("loogin success !!!!!");
            //    console.log(response);
            //    $rootScope.loggedInStatus = true;
            //    $state.go("profile");
            //}, function(response){
            //    console.log("login failure !!!!!");
            //    console.log(response);
            //});
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