var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voucherListSchema = new Schema({
    id : Number,
    code : String,
    maxDiscount : String,
    discountPercent : String,
    minAmount : String,
    name : String,
    validFrom : String,
    validTo : String
});

module.exports = mongoose.model('vouchersList', voucherListSchema, 'vouchersList');