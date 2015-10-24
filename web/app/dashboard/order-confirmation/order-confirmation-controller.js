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
        }
    ]);
})();