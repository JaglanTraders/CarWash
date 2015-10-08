(function () {

    angular.module('carwash.myControllers').controller('signUpController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService) {

            $scope.onSignUpSubmitClick = function () {
                if($scope.registerForm.$invalid){
                    if($scope.registerForm.$error.required != null){
                        $scope.registerForm.$error.required.forEach(function(element){
                            element.$setDirty();
                        });
                    }
                    return;
                }
                var url = apiUrlConfig.signUp;
                var reqObj = $scope.register;
                apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                    console.log("success", response);
                    $state.go("login");
                    commonService.showSuccessMsg("Registered Successfully. Please Login to continue");
                }, function (response) {
                    if(response.data.message == "Email Id is already registered"){
                        $scope.registerForm.email.$invalid = true;
                    }
                    commonService.onApiResponseError(response);
                });
            };
            
            $scope.onSignUpCancelClick = function () {
                $state.go("login");
            };
        }
    ]);
})();