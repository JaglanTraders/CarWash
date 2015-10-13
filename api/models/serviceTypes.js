var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceTypesSchema = new Schema({
    cat : String,
    catId: String,
    rank : String,
    catName: String,
    description: String,
    price: String,
    features : Array
});

module.exports = mongoose.model('serviceTypes', serviceTypesSchema, 'serviceTypes');