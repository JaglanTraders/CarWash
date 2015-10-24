(function () {
    angular.module("carwash.myModels").factory('carwash.dashboard.home.homeModel', function () {

        var userOrderObj = function (obj) {
            var picUpLatLng = obj.picUpLatLng;
            var packageCat = obj.packageCat;
            var packageCatId = obj.packageCatId;
            var packageOrigionalPrice = obj.packageOrigionalPrice;
            var packageDiscountedPrice = obj.packageDiscountedPrice;
            var appliedPromoCode = obj.appliedPromoCode;
            var paymentMode = obj.paymentMode;
            var houseNo = obj.houseNo;

            var getUserOrderObj = function (){
                return {
                    picUpLatLng : picUpLatLng,
                    packageCat : packageCat,
                    packageCatId : packageCatId,
                    packageOrigionalPrice : packageOrigionalPrice,
                    packageDiscountedPrice : packageDiscountedPrice,
                    appliedPromoCode : appliedPromoCode,
                    paymentMode : paymentMode,
                    houseNo : houseNo
                }
            };

            var setPickUpLatLng = function (latLngObj) {
                picUpLatLng = latLngObj;
            };

            var setAppliedPromoCode = function (promoCode) {
                appliedPromoCode = promoCode;
            };

            var setPaymentMode = function (payMode) {
                paymentMode = payMode;
            };

            var setHouseNo = function (flatNo) {
                houseNo = flatNo;
            };

            var setSelectedPackageDetails = function (cat, catId, origionalprice) {
                packageCat = cat;
                packageCatId = catId;
                packageOrigionalPrice = origionalprice;
                packageDiscountedPrice = origionalprice;
            };

            var setPackageDiscountedPrice = function (discountedPrice) {
                packageDiscountedPrice = discountedPrice;
            };

            var getPickUpLatLng = function(){
                return picUpLatLng;
            };

            var getPaymentMode = function (payMode) {
                return paymentMode;
            };

            var getHouseNo = function (flatNo) {
                return houseNo;
            };

            var getPackageDiscountedPrice = function(){
                return packageDiscountedPrice;
            };

            var getPackageOrigionalPrice = function(){
                return packageOrigionalPrice;
            };

            var getPackageCategory = function(){
                return packageCat;
            };

            return {
                getUserOrderObj : getUserOrderObj,
                setPickUpLatLng : setPickUpLatLng,
                setSelectedPackageDetails : setSelectedPackageDetails,
                setPackageDiscountedPrice : setPackageDiscountedPrice,
                setAppliedPromoCode : setAppliedPromoCode,
                setPaymentMode : setPaymentMode,
                setHouseNo : setHouseNo,
                getPickUpLatLng : getPickUpLatLng,
                getPackageDiscountedPrice : getPackageDiscountedPrice,
                getPackageOrigionalPrice : getPackageOrigionalPrice,
                getPackageCategory : getPackageCategory,
                getHouseNo : getHouseNo,
                getPaymentMode : getPaymentMode
            }
        };
        return {
            userOrderObj : userOrderObj
        }
    });
})();