(function () {
    angular.module("carwash.myServices").factory('mapPlaces', [
        '$q',
        function ($q) {
            var searchTypes = ['address', 'store', 'establishment', 'regions', 'sublocality', 'postal_code', 'cities'];
            var autoCompleteSearch = function (map, updatePickUpLocationMarkerCallBack) {
                var defaultBounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(18.559101376048694, 73.78125419842536)
                );

                var input = document.getElementById('mapPlacesSearchTxt');
                var options = {
                    bounds: defaultBounds,
                    types: searchTypes
                };
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', map);
                autocomplete.addListener('place_changed', function () {
                    console.log("place changed");
                    console.log(autocomplete.getPlace());
                    var place = autocomplete.getPlace();
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);  // Why 17? Because it looks good.
                    }
                    updatePickUpLocationMarkerCallBack(map, place.geometry.location);
                });
                return autocomplete;
            };

            var encodeGeocodeAddress = function(address) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': address}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        console.log("Geocode results", results);
                    } else {
                        console.log('Geocode was not successful for the following reason: ' , status);
                    }
                });
            };

            var decodeGeocodeLatLng = function(latlng) {
                var deferred = $q.defer();
                var geocoder = new google.maps.Geocoder;
                geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        console.log("decode results", results);
                        deferred.resolve(results);
                    } else {
                        console.log('decode Geocode LatLng: ', status);
                        deferred.reject(status);
                    }
                });
                return deferred.promise;
            };

            return {
                autoCompleteSearch : autoCompleteSearch,
                encodeGeocodeAddress : encodeGeocodeAddress,
                decodeGeocodeLatLng : decodeGeocodeLatLng
            }
        }
    ]);
})();