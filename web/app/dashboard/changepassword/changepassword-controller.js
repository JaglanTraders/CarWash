(function () {

    angular.module('carwash.myControllers').controller('changePasswordController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        '$stateParams',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService, $stateParams) {
            $scope.onChangePasswordSubmitClick = function(){
                if($scope.changePasswordForm.$invalid){
                    if($scope.changePasswordForm.$error.required != null){
                        $scope.changePasswordForm.$error.required.forEach(function(element){
                            element.$setDirty();
                        });
                    }
                    return null;
                }
                else if($scope.changePasswordObj.oldPassword == $scope.changePasswordObj.newPassword){
                    commonService.showInfoMsg("Old Password & new Password Can't be same");
                    return null;
                }
                var url = apiUrlConfig.changePassword;
                var reqObj = $scope.changePasswordObj;
                apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                    commonService.showSuccessMsg("Password Changed Successfully");
                    $state.go("home.pickUp");
                }, function(response){
                    commonService.onApiResponseError(response);
                });
            };

            $scope.onChangePasswordCancelClick = function () {
                $state.go("home.pickUp");
            }
        }
    ]);
})();