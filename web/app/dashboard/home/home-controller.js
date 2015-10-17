(function () {

    angular.module('carwash.myControllers').controller('homeController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        'carwash.dashboard.home.homeModel',
        function ($scope, $state, apiUrlConfig, apiMethods, homeModel) {
            $scope.userOrderObj = homeModel.userOrderObj({});

            //$scope.setPicUpLatLng = function (latLngObj) {
            //    $scope.userOrderObj.picUpLatLng = latLngObj;
            //};
            //
            //$scope.setSelectedPackageDetails = function (cat, catId, origionalprice) {
            //    $scope.userOrderObj.packageCat = cat;
            //    $scope.userOrderObj.packageCatId = catId;
            //    $scope.userOrderObj.packageOrigionalPrice = origionalprice;
            //    $scope.userOrderObj.packageDiscountedPrice = origionalprice;
            //};
            //
            //$scope.getPickUpLatLng = function(){
            //    return $scope.userOrderObj.picUpLatLng;
            //};
            //
            //$scope.getPackageDiscountedPrice = function(){
            //    return $scope.userOrderObj.packageDiscountedPrice;
            //};
            //
            //$scope.getPackageOrigionalPrice = function(){
            //    return $scope.userOrderObj.packageOrigionalPrice;
            //};
        }
    ]);
})();