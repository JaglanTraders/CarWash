var deferred = require('deferred');
var distance = require('google-distance-matrix');
distance.mode('driving');
//distance.language('en');
//distance.key('AIzaSyD4U3MJDlkTRuq0WrPBtQi71Hrt4PPcGj4');
distance.avoid('tolls');
distance.avoid('highways');
distance.units('metric');

module.exports = function () {

    var getDistanceMatrixObj = function (originArr, destinationArr) {
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

    return {
        getDistanceMatrixObj : getDistanceMatrixObj
    }
};