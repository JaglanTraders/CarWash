(function () {
    angular.module('carwash.myControllers').controller('verifyDetailsController', [
        '$scope',
        '$state',
        '$filter',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        'mapPlaces',
        function ($scope, $state, $filter, apiUrlConfig, apiMethods, commonService, mapPlaces) {
            $scope.verifyDetailsObj = $scope.userOrderObj;
            mapPlaces.decodeGeocodeLatLng($scope.verifyDetailsObj.selectedLocation).then(function (response) {
                $scope.verifyDetailsObj.address = response[0].formatted_address;
            }, function (response) {
                console.log(response);
            });
            
            $scope.onVerifyDetailsNextClick = function () {

            };

            $scope.applyVoucherClick = function(){
                var url = apiUrlConfig.applyVoucherCode;
                var req = {
                    voucherCode : $scope.verifyDetailsObj.voucherCode,
                    origionalPrice : $scope.verifyDetailsObj.packageObj.price
                };
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    console.log("success", response);
                }, function (response) {
                    console.log("error", response);
                });
            }
        }
    ]);
})();