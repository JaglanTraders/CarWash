(function () {

    angular.module('carwash.myControllers').controller('paymentModeController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        'carwash.dashboard.home.homeModel',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService, homeModel) {

            if($scope.userOrderObj.getPackageCategory() == null || $scope.userOrderObj.getPackageCategory() == ""){
                $state.go("home.selectServices");
                return;
            }

            $scope.paymentMode = $scope.userOrderObj.getPaymentMode();
            $scope.amountToPay = $scope.userOrderObj.getPackageDiscountedPrice();

            $scope.onPaymentModeNextClick = function () {
                console.log($scope.paymentMode);
                if($scope.paymentMode == null){
                    commonService.showInfoMsg("Please select Payment Mode");
                    return;
                }
                var url = apiUrlConfig.placeOrder;
                $scope.userOrderObj.setPaymentMode($scope.paymentMode);
                var req = $scope.userOrderObj.getUserOrderObj();
                console.log(req);
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    console.log("Success : ", response);
                    commonService.updateOpenOrderStatusInLocalStore(true);
                    $state.go("home.orderConfirmation",{
                        picUpDetails : response.data
                    });
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            };
        }
    ]);
})();