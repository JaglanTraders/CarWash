(function () {

    angular.module('carwash.myControllers').controller('picUpFormController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'mapService',
        'mapPlaces',
        function ($scope, $state, apiUrlConfig, apiMethods, mapService, mapPlaces) {
            var map = mapService.initializeMap("googleMapPicUp");

            $scope.windowHeight = window.innerHeight;
            console.log(map);
            mapPlaces.autoCompleteSearch(map, mapService.updatePickUpLocationMarker);
        }
    ]);
})();