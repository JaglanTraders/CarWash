var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersListSchema = new Schema({
    orderId : Number,
    orderDateTime : String,
    orderLocation : Object,
    houseNo : String,
    userId : Number,
    vendorId : Number,
    assignedStaffId : Number,
    expectedPicUpTime : String,
    packageId : Number,
    promoCode : String,
    amount : String,
    paymentMode : String,
    paymentStatus : String,
    orderStatus : String,
    userComments : String,
    staffComments : String,
    userRating : String,
    staffRating : String
});

module.exports = mongoose.model('ordersList', ordersListSchema, 'ordersList');