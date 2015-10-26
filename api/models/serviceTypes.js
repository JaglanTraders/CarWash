var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceTypesSchema = new Schema({
    cat : String,
    catId: Number,
    rank : String,
    catName: String,
    description: String,
    price: String,
    features : Array
});

module.exports = mongoose.model('serviceTypes', serviceTypesSchema, 'serviceTypes');