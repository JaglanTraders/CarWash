(function () {
    angular.module('carwash.common').controller('carwash.common.login.loginController',['$scope', '$state', 'carwash.services.apiUrlConfig', 'carwash.services.apiMethods', 'carwash.common.login.loginModelService', function ($scope, $state, apiUrlConfig, apiMethods, loginModel) {
        
        $scope.onLoginClick = function () {
            console.log("login clicked");
            console.log($scope.login);
            var url = apiUrlConfig.login;
            var reqObj = $scope.login;
            apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                console.log("loogin success !!!!!");
                console.log(response);
                $rootScope.loggedInStatus = true;
                $state.go("profile");
            }, function(response){
                console.log("login failure !!!!!");
                console.log(response);
            });
            localStorage.appLoggedIn = true;
                $state.go("profile");
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