var deferred = require('deferred');
var distance = require('google-distance-matrix');
distance.mode('driving');
//distance.language('en');
//distance.key('AIzaSyD4U3MJDlkTRuq0WrPBtQi71Hrt4PPcGj4');
distance.avoid('tolls');
distance.avoid('highways');
distance.units('metric');

module.exports = function () {

    var getDistanceMatrixObjFromGoogle = function (originArr, destinationArr) {
        var q = deferred();
        distance.matrix(originArr, destinationArr, function (err, distances) {
            if (err)
                q.reject(err);
            else{
                console.log(distances);
                q.resolve(distances)
            }
        });
        return q.promise;
    };

    var getDistanceBetweenTwoCords = function (startCords, endCords) {
        var deg2rad = function(deg) {
            return deg * (Math.PI / 180)
        };
        var lat1 = startCords.lat;
        var lon1 = startCords.lng;
        var lat2 = endCords.lat;
        var lon2 = endCords.lng;
        //var getDistanceFromLatLonInKm = function(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        var dInMeters = d*1000;
        //};
        return dInMeters;
    };
    
    return {
        getDistanceMatrixObjFromGoogle : getDistanceMatrixObjFromGoogle,
        getDistanceBetweenTwoCords : getDistanceBetweenTwoCords
    }
};