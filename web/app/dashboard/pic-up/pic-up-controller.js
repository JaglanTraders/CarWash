(function () {

    angular.module('carwash.myControllers').controller('picUpController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'mapService',
        'mapPlaces',
        function ($scope, $state, apiUrlConfig, apiMethods, mapService, mapPlaces) {
            var setPicUpLocation = function (positionObj) {
                $scope.userOrderObj.setPicUpLatLng(positionObj);
                $state.go("home.selectServices");
            };
            var map = mapService.initializeMap("googleMapPicUp", setPicUpLocation);
            $scope.windowHeight = window.innerHeight-50;
            console.log(map);
            
            mapPlaces.autoCompleteSearch(map, mapService.updatePickUpLocationMarker);
            

        }
    ]);
})();