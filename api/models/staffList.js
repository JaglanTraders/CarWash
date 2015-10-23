var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var staffListSchema = new Schema({
    staffId : String,
    email : String,
    password : String,
    name : String,
    doj : String,
    Mobile : String,
    Address : String,
    vendor : String,
    vendorId : String,
    serviceAvailabilty : Boolean,
    locationList : Array
});

module.exports = mongoose.model('staffList', staffListSchema, 'staffList');