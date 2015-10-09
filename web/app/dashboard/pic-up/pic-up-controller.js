(function () {

    angular.module('carwash.myControllers').controller('picUpController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        function ($scope, $state, apiUrlConfig, apiMethods) {
            var initializeMap = function () {
                var mapProp = {
                    center:new google.maps.LatLng(51.508742, -0.120850),
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map=new google.maps.Map(document.getElementById("googleMapPicUp"), mapProp);
            };
            google.maps.event.addDomListener(window, 'load', initializeMap);

            $scope.windowWidth = window.innerWidth;
            $scope.windowHeight = window.innerHeight;
        }
    ]);
})();