(function () {
    angular.module("carwash.myModels").factory('orderHistoryModel', [
		'mapPlaces',
		'commonService',
		function (mapPlaces, commonService) {
			var getOrderHistoryObj = function (obj) {
				return {
					orderId : obj.orderId,
					orderDateTime : commonService.formatISODate(obj.orderDateTime),
					//orderLocation : mapPlaces.decodeGeocodeLatLng(obj.orderLocation)[0].formatted_address,
					orderLocation : obj.orderLocation,
					houseNo : obj.houseNo,
					vendorId : obj.vendorId,
					assignedStaffId : obj.assignedStaffId,
					expectedPicUpTime : obj.expectedPicUpTime,
					packageId : obj.packageId,
					promoCode : obj.promoCode,
					amount : obj.amount,
					paymentMode : obj.paymentMode,
					paymentStatus : obj.paymentStatus,
					orderStatus : obj.orderStatus,
					userComments : obj.userComments,
					staffComments : obj.staffComments,
					userRating : obj.userRating,
					staffRating : obj.staffRating
				}
			};

			var digestApiObj = function (apiObj) {
				var arr =[];
				for(var i=0;i< apiObj.length; i++){
					var obj = getOrderHistoryObj(apiObj[i]);
					arr.push(obj);
				}
				return arr;
			};
			return {
				digestApiObj : digestApiObj
			}
		}
	]);
})();