(function () {
    angular.module('carwash.myControllers').controller('selectServicesController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        'carwash.dashboard.select-service.selectServicesModel',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService, selectServicesModel) {

            var getServiceTypes = function () {
                var url = apiUrlConfig.getServiceTypes;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.serviceTypeList = selectServicesModel.digestApiObj(response.data);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            getServiceTypes();
        }
    ]);
})();