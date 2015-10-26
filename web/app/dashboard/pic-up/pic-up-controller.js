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
                    if(response.data != null)
                        mapService.showInfoWindow(map, marker, response.data.message);
                    else
                        mapService.showInfoWindow(map, marker, "Server failure");
                });
            };
            var map = mapService.initializeMap("googleMapPicUp", setPicUpLocation);
            $scope.windowHeight = window.innerHeight-50;
            console.log(map);
            
            mapPlaces.autoCompleteSearch(map, mapService.updatePickUpLocationMarker);
            

        }
    ]);
})();