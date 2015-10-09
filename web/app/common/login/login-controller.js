(function () {
    angular.module('carwash.myControllers').controller('loginController',[
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService) {
        
        $scope.onLoginClick = function () {
            console.log($scope.loginForm);
            if($scope.loginForm.$invalid){
                if($scope.loginForm.$error.required != null){
                    $scope.loginForm.$error.required.forEach(function(element){
                        element.$setDirty();
                    });
                }
                return;
            }
            var url = apiUrlConfig.login;
            var reqObj = $scope.login;
            apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                console.log("success", response);
                $state.go("pickUp");
                //commonService.showSuccessMsg("LoggedIn Successfully");
            }, function (response) {
                $scope.loginForm.loginEmail.$invalid = true;
                $scope.loginForm.loginPassword.$invalid = true;
                commonService.onApiResponseError(response);
            });
        };
            
        $scope.onSignUpClick = function () {
            $state.go("signUp");
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