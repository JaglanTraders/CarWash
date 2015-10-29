(function () {
    angular.module("carwash.myServices").factory('mapService', [
        '$q',
        '$state',
        'mapPlaces',
        function ($q, $state, mapPlaces) {
            var currentLocationMarker, pickUpLocationMarker;
            var infoWindow = new google.maps.InfoWindow();
            var initializeMap = function (divId, callback) {
                var mapProp = {
                    //center:new google.maps.LatLng(51.508742, -0.120850),
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById(divId), mapProp);
                addCurrentLocationControl(map);
                updateCurrentPosition(map);
                createPickUpLocationMarker(map, callback);
                createCurrentLocationMarker(map);
                defineMapListenerEvents(map);
                return map;
            };

            var defineMapListenerEvents = function (map) {
                //map.addListener("dragstart", function () {
                //    updatePickUpLocationMarker(map, map.getCenter());
                //});
                map.addListener("dragend", function () {
                    updatePickUpLocationMarker(map, map.getCenter());
                });
                map.addListener("drag", function () {
                    updatePickUpLocationMarker(map, map.getCenter());
                });
                //map.addListener("center_changed", function () {
                //    updatePickUpLocationMarker(map, map.getCenter());
                //});
                //map.addListener("idle", function () {
                //    updatePickUpLocationMarker(map, map.getCenter());
                //});
            };

            var addCurrentLocationControl = function(map){
                var mainDiv = document.createElement('div');
                var image = document.createElement('img');
                image.src = "images/current.jpg";
                image.height = 30;
                image.width = 30;
                mainDiv.title  = 'Your Location';
                mainDiv.style.cursor = 'pointer';
                mainDiv.style.margin = "0px 10px 0px 0px";
                mainDiv.appendChild(image);
                mainDiv.addEventListener('click', function() {
                    updateCurrentPosition(map);
                });
                mainDiv.index = 1;
                map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(mainDiv);
            };

            var showInfoWindow = function (map, marker, msg) {
                infoWindow.setContent(msg);
                infoWindow.open(map, marker);
                return infoWindow;
            };

            var createCurrentLocationMarker = function (map) {
                var imageUrl = "images/location-indicator.gif";
                updateCurrentPosition(map).then(function(data){
                    var pos = {
                        lat : data.coords.latitude,
                        lng : data.coords.longitude
                    };
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "Your Location",
                        icon : imageUrl
                    });
                    currentLocationMarker = marker;
                }, function (data) {
                    console.log("Geolocation service failure / device not supporting");
                });
            };

            var updateCurrentLocationMarker = function (pos) {
                if(currentLocationMarker == null)
                    return;
                currentLocationMarker.setPosition(pos);
            };

            var updatePickUpLocationMarker = function (map, pos) {
                if(pickUpLocationMarker == null)
                    return;
                pickUpLocationMarker.setPosition(pos);
                mapPlaces.decodeGeocodeLatLng(pos).then(function (data) {
                    var address = data[0].formatted_address;
                    showInfoWindow(map, pickUpLocationMarker, address);
                    updateSearchFieldValue(address);
                }, function (data) {
                    console.log("decode lat lng service failed");
                });
            };

            var updateSearchFieldValue = function (address) {
                document.getElementById("mapPlacesSearchTxt").value = address;
            };

            var createPickUpLocationMarker = function (map, callback) {
                var imageUrl = "images/car-pin.png";
                updateCurrentPosition(map).then(function(data){
                    var pos = {
                        lat : data.coords.latitude,
                        lng : data.coords.longitude
                    };
                    var marker = new google.maps.Marker({
                        position: map.getCenter(),
                        map: map,
                        animation: google.maps.Animation.DROP,
                        draggable:true,
                        icon : imageUrl
                    });
                    pickUpLocationMarker = marker;
                    showInfoWindow(map, marker, 'Drag it to choose pic up location');
                    definePickUpLocationMarkerEvents(map, marker, callback);
                }, function (data) {
                    console.log("Geolocation service failure / device not supporting");
                });
            };

            var definePickUpLocationMarkerEvents = function (map, marker, callback) {
                marker.addListener("dragend", function () {
                    updatePickUpLocationMarker(map, marker.getPosition());
                });
                marker.addListener("click", function () {
                    var posObj = {
                        lat : marker.getPosition().lat(),
                        lng : marker.getPosition().lng()
                    };
                    callback(map, marker, posObj);
                });
            };

            var updateCurrentPosition = function (map) {
                var deferred = $q.defer();
                var handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
                    deferred.reject("Geolocation service failed");
                    //infoWindow.setPosition(pos);
                    var content = browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.';
                    showInfoWindow(map, pickUpLocationMarker, content);
                };
                if (navigator.geolocation) { // Try HTML5 geolocation.
                    navigator.geolocation.getCurrentPosition(function (position) {
                        deferred.resolve(position);
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        updateCurrentLocationMarker(pos);
                        updatePickUpLocationMarker(map, pos);
                        map.setCenter(pos);
                        new google.maps.Circle({
                            center: pos,
                            radius: position.coords.accuracy
                        });
                    }, function () {
                        handleLocationError(true, infoWindow, map.getCenter());
                    });
                } else { // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
                return deferred.promise;
            };

            return {
                initializeMap : initializeMap,
                showInfoWindow : showInfoWindow,
                updatePickUpLocationMarker : updatePickUpLocationMarker
            }
        }
    ]);
})();