(function () {

    angular.module('carwash.myControllers').controller('picUpController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'mapService',
        'mapPlaces',
        function ($scope, $state, apiUrlConfig, apiMethods, mapService, mapPlaces) {

            var setPicUpLocation = function (map, marker, positionObj) {
                $scope.userOrderObj.setPickUpLatLng(positionObj);
                var url = apiUrlConfig.isServiceAvailable;
                var req = {
                    picUpLatLng : $scope.userOrderObj.getPickUpLatLng()
                };
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    $state.go("home.selectServices");
                }, function (response) {
                    mapService.showInfoWindow(map, marker, "Oops! Service not available in this area.");
                });

            };
            var map = mapService.initializeMap("googleMapPicUp", setPicUpLocation);
            $scope.windowHeight = window.innerHeight-50;
            console.log(map);
            
            mapPlaces.autoCompleteSearch(map, mapService.updatePickUpLocationMarker);
            

        }
    ]);
})();