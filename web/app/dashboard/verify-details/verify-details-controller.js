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

            if($scope.userOrderObj.getPackageCategory() == null || $scope.userOrderObj.getPackageCategory() == ""){
                $state.go("home.selectServices");
                return;
            }
            $scope.societyName = $scope.userOrderObj.getHouseNo();
            $scope.verifyDetailsObj = {};
            mapPlaces.decodeGeocodeLatLng($scope.userOrderObj.getPickUpLatLng()).then(function (response) {
                $scope.latLngAddress = response[0].formatted_address;
            }, function (response) {
                console.log(response);
            });
            
            $scope.onVerifyDetailsNextClick = function () {
                $scope.userOrderObj.setHouseNo($scope.societyName);
                $state.go("home.paymentMode");
            };

            $scope.applyVoucherClick = function(){
                var url = apiUrlConfig.applyVoucherCode;
                var req = {
                    voucherCode : $scope.voucherCode,
                    origionalPrice : $scope.userOrderObj.getPackageOrigionalPrice()
                };
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    console.log("success", response);
                    $scope.userOrderObj.setPackageDiscountedPrice(response.data.discountedPrice);
                    $scope.userOrderObj.setAppliedPromoCode($scope.voucherCode);
                    $scope.voucherSuccessMsg = response.data.message;
                    $scope.voucherErrorMsg = null;
                }, function (response) {
                    console.log("error", response);
                    $scope.userOrderObj.setAppliedPromoCode(null);
                    $scope.userOrderObj.setPackageDiscountedPrice($scope.userOrderObj.getPackageOrigionalPrice());
                    $scope.voucherErrorMsg = response.data.message;
                    $scope.voucherSuccessMsg = null;
                });
            }
        }
    ]);
})();