(function () {

    angular.module('carwash.myControllers').controller('carwash.common.header.headerController', [
        '$scope',
        '$rootScope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        '$translate',
        '$translatePartialLoader',
        function ($scope, $rootScope, $state, apiUrlConfig, apiMethods, commonService, $translate, $translatePartialLoader) {
            $scope.onLogoutClick = function(){
                var url = apiUrlConfig.logout;
                apiMethods.apiPOSTReq(url).then(function (response) {
                    console.log(response);
                    $state.go("login");
                    commonService.showSuccessMsg(response.data.message);
                }, function(response){
                    commonService.onApiResponseError(response);
                });
            }
        }
    ]);
})();