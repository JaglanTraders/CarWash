(function () {

    angular.module('carwash.myControllers').controller('homeController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        function ($scope, $state, apiUrlConfig, apiMethods) {
            $scope.userOrderObj = {};
        }
    ]);
})();