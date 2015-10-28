(function () {

    angular.module('carwash.myControllers').controller('orderHistoryController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'commonService',
        '$stateParams',
        'orderHistoryModel',
        function ($scope, $state, apiUrlConfig, apiMethods, commonService, $stateParams, orderHistoryModel) {
            var url = apiUrlConfig.orderHistory;
            apiMethods.apiGETReq(url).then(function (response) {
                console.log(response);
                $scope.orderHistoryObj = orderHistoryModel.digestApiObj(response.data);
            }, function (response) {
                commonService.onApiResponseError(response);
            });
        }
    ]);
})();