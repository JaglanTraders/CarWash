var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    var ordersListSchema = new Schema({
        orderId : String,
        orderDateTime : String,
        orderLocation : String,
        houseNo : String,
        userId : String,
        vendorId : String,
        assignedStaffId : String,
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

    return {
        ordersModel : mongoose.model('ordersList', ordersListSchema, 'ordersList')
    }
};