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

            var getUserOrderObj = {
                picUpLatLng : picUpLatLng,
                packageCat : packageCat,
                packageCatId : packageCatId,
                packageOrigionalPrice : packageOrigionalPrice,
                packageDiscountedPrice : packageDiscountedPrice,
                appliedPromoCode : appliedPromoCode,
                paymentMode : paymentMode
            };

            var setPicUpLatLng = function (latLngObj) {
                picUpLatLng = latLngObj;
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
                setPicUpLatLng : setPicUpLatLng,
                setSelectedPackageDetails : setSelectedPackageDetails,
                setPackageDiscountedPrice : setPackageDiscountedPrice,
                getPickUpLatLng : getPickUpLatLng,
                getPackageDiscountedPrice : getPackageDiscountedPrice,
                getPackageOrigionalPrice : getPackageOrigionalPrice,
                getPackageCategory : getPackageCategory
            }
        };
        return {
            userOrderObj : userOrderObj
        }
    });
})();