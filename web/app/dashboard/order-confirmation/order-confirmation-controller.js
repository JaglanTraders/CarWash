(function () {
    angular.module('carwash.myControllers').controller('orderConfirmationController', [
        '$scope',
        '$state',
        '$filter',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        'mapPlaces',
        function ($scope, $state, $filter, apiUrlConfig, apiMethods, commonService, mapPlaces) {
            console.log($state.params.picUpDetails);
            $scope.orderConfirmationObj = $state.params.picUpDetails;

            if($scope.orderConfirmationObj == null ||$scope.orderConfirmationObj == ""){
                var url = apiUrlConfig.openOrder;
                apiMethods.apiGETReq(url).then(function (response) {
                    $scope.orderConfirmationObj = response.data;
                }, function (response) {
                    commonService.onApiResponseError(response);
                });
            }

            $scope.onCancelOrderClick = function (orderId) {
                if(orderId != null){
                    var url = apiUrlConfig.cancelOrder;
                    apiMethods.apiPOSTReq(url, {orderId : orderId}).then(function (response) {
                        commonService.showSuccessMsg("Your Order has been cancelled");
                        $state.go("home.pickUp");
                    }, function (response) {
                       commonService.onApiResponseError(response);
                    });
                }
                else{
                    commonService.showErrorMsg("No order to cancel.");
                }
            };
        }
    ]);
})();