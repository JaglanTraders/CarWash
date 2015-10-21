(function () {

    angular.module('carwash.myControllers').controller('paymentModeController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'carwash.dashboard.home.homeModel',
        function ($scope, $state, apiUrlConfig, apiMethods, homeModel) {
            $scope.amountToPay = $scope.userOrderObj.getPackageDiscountedPrice();
        }
    ]);
})();