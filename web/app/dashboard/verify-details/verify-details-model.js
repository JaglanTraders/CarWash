(function () {
    angular.module("carwash.myModels").factory('carwash.dashboard.select-service.selectServicesModel', function () {
       	var digestApiObj = function (apiObj) {
			var arr =[];
			for(var i=0;i< apiObj.length; i++){
				var obj = {
					cat : apiObj[i].cat,
					catId: apiObj[i].catId,
					rank : apiObj[i].rank,
					catName: apiObj[i].catName,
					description: apiObj[i].description,
					price: apiObj[i].price,
					features : apiObj[i].features
				};
				arr.push(obj);
			}
			return arr;
		};
		return {
			digestApiObj : digestApiObj
		}
    });
})();