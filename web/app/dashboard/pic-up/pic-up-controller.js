(function () {

    angular.module('carwash.myControllers').controller('picUpController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'mapService',
        'mapPlaces',
        '$timeout',
        function ($scope, $state, apiUrlConfig, apiMethods, mapService, mapPlaces, $timeout) {
            $scope.windowHeight = window.innerHeight-50;
            var setPicUpLocation = function (map, marker, positionObj) {
                $scope.userOrderObj.setPickUpLatLng(positionObj);
                var url = apiUrlConfig.isServiceAvailable;
                var req = {
                    picUpLatLng : $scope.userOrderObj.getPickUpLatLng()
                };
                apiMethods.apiPOSTReq(url, req).then(function (response) {
                    $state.go("home.selectServices");
                }, function (response) {
                    if(response.data != null)
                        mapService.showInfoWindow(map, marker, response.data.message);
                    else
                        mapService.showInfoWindow(map, marker, "Server failure");
                });
            };
            document.getElementById("googleMapPicUp").innerHTML = "";
            var map = mapService.initializeMap("googleMapPicUp", setPicUpLocation);
            mapPlaces.autoCompleteSearch(map, mapService.updatePickUpLocationMarker);
            console.log(map);
            //map.events.trigger(map, 'resize');

        }
    ]);
})();