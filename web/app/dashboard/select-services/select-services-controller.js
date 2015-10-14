(function () {
    angular.module('carwash.myControllers').controller('selectServicesController', [
        '$scope',
        '$state',
        '$filter',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        'carwash.dashboard.select-service.selectServicesModel',
        function ($scope, $state, $filter, apiUrlConfig, apiMethods, commonService, selectServicesModel) {

            var getServiceTypes = function () {
                var url = apiUrlConfig.getServiceTypes;
                apiMethods.apiGETReq(url).then(function (response) {
                    var responseList = selectServicesModel.digestApiObj(response.data);
                    $scope.serviceTypeList = $filter('orderBy')(responseList, 'rank');
                    $scope.selectedPackageId = $scope.serviceTypeList[0].catId;
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            getServiceTypes();

            $scope.onPackageSelected = function(packageId){
                $scope.selectedPackageId = packageId;
            };

            $scope.onSelectServiceNextClick = function(){
                $scope.userOrderObj.serviceCatId = $scope.selectedPackageId;
                console.log($scope.selectedPackageId);
                $state.go("home.verifyDetails");
            }
        }
    ]);
})();