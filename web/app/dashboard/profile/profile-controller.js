(function () {

    angular.module('carwash.myControllers').controller('profileController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService) {
            $scope.accountEditMode = false;
            var getMyAccountDetails = function () {
                var url = apiUrlConfig.getMyAccount;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.myAccountObj = response.data;
                    $scope.myAccountEditObj = JSON.parse(JSON.stringify($scope.myAccountObj));
                }, function(response){
                    commonService.onApiResponseError(response);
                });
            };
            getMyAccountDetails();

            $scope.editProfile = function () {
                $scope.accountEditMode = true;
            };

            $scope.saveEditedProfile = function () {
                if($scope.myAccountForm.$invalid){
                    if($scope.myAccountForm.$error.required != null){
                        $scope.myAccountForm.$error.required.forEach(function(element){
                            element.$setDirty();
                        });
                    }
                    return;
                }
                var url = apiUrlConfig.getMyAccount;
                var reqObj = $scope.myAccountEditObj;
                apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                    commonService.showSuccessMsg(response.data.message);
                    getMyAccountDetails();
                    $scope.accountEditMode = false;
                }, function(response){
                    commonService.onApiResponseError(response);
                });
            };

            $scope.cancelEditProfile = function () {
                $scope.accountEditMode = false;
            }
        }
    ]);
})();