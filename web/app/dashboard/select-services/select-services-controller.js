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

            if($scope.userOrderObj.getPickUpLatLng() == null || $scope.userOrderObj.getPickUpLatLng() == ""){
                $state.go("home.pickUp");
                return;
            }

            var getServiceTypes = function () {
                var url = apiUrlConfig.getServiceTypes;
                apiMethods.apiGETReq(url).then(function (response) {
                    var responseList = selectServicesModel.digestApiObj(response.data);
                    $scope.serviceTypeList = $filter('orderBy')(responseList, 'rank');
                    $scope.onPackageSelected($scope.serviceTypeList[0]);
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
            getServiceTypes();

            $scope.onPackageSelected = function(packageObj){
                $scope.userOrderObj.setSelectedPackageDetails(packageObj.cat, packageObj.catId, packageObj.price);
            };

            $scope.onSelectServiceNextClick = function(){
                $state.go("home.verifyDetails");
            }
        }
    ]);
})();