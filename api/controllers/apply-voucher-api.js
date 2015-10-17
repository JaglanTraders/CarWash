var controller;
var voucherListModel = require('../models/voucherList');
var commonServices = require('../services/common-services')();

module.exports = function () {
    var processVoucher = function (voucherObj, originalPrice) {
        console.log("database min AMt", voucherObj.minAmount);
        if(originalPrice <= voucherObj.minAmount){
            return {
                status : 404,
                msg : "This Voucher is valid only above Rs."+ voucherObj.minAmount
            }
        }
        var todayDate = new Date();
        var validFrom = new Date(voucherObj.validFrom);
        var validTo = new Date(voucherObj.validTo);
        if(todayDate < validFrom || todayDate > validTo){
            return {
                status : 404,
                message : "This Voucher has been Expired. / Invalid Voucher."
            }
        }
        var discount = (originalPrice/voucherObj.discountPercent)*100;
        if(discount > voucherObj.maxDiscount){
            return {
                status : 200,
                discountedPrice : originalPrice-voucherObj.maxDiscount,
                message : "Voucher applied. Max discount is Rs. "+voucherObj.maxDiscount+" Only."
            }
        }
        else{
            return {
                status : 200,
                discountedPrice : originalPrice-discount,
                message : "Voucher applied."
            }
        }
    };

    var applyVoucher = function (req, res) {
        var reqObj = req.body;
        if(reqObj.origionalPrice == null || reqObj.origionalPrice == "") {
            return res.status(404).send(commonServices.onErrorJson("Invalid Voucher Code"));
        }

        voucherListModel.findOne({code :reqObj.voucherCode}, function (err, docs) {
            console.log("docs", docs);
            if(err)
                return res.send(err);
            if (docs != null && docs != []) {
                var processedObj = processVoucher(docs, reqObj.origionalPrice);
                return res.status(processedObj.status).send(processedObj);
            }
            else
                return res.status(404).send(commonServices.onErrorJson("Invalid Voucher Code"));
        });
    };

    return {
        applyVoucher : applyVoucher
    }
};