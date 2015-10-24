var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersListSchema = new Schema({
    orderId : String,
    orderDateTime : String,
    orderLocation : Object,
    houseNo : String,
    userId : String,
    vendorId : String,
    assignedStaffId : String,
    expectedPicUpTime : String,
    packageId : String,
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