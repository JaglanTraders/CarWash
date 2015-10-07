(function () {

    angular.module('carwash.common').controller('carwash.common.user-dashboard.changepassword.changePasswordController', ['$scope', '$state', 'carwash.services.apiUrlConfig', 'carwash.services.apiMethods','$stateParams', function ($scope, $state, apiUrlConfig, apiMethods, $stateParams) {

    	console.log($stateParams.uuid);
    	var resetUUID = $stateParams.uuid;
    	if(resetUUID != null && resetUUID != "" && resetUUID != undefined){
    		$scope.isResettingPass = true;
    		var url = apiUrlConfig.resetPasswordAuth+"/"+resetUUID;
            //var reqObj = $scope.changepassword;
            apiMethods.apiPOSTReq(url).then(function (response) {
                console.log(" resetPasswordAuth service success !!!!!");
                
            }, function(response){
                console.log("resetPasswordAuth service failure !!!!!");
                console.log(response);
            });
    	}

    	$scope.onChangePasswordClick = function(){
    		if(resetUUID != null && resetUUID != "" && resetUUID != undefined)
	    		var url = apiUrlConfig.resetPassword;
	    	else
    			var url = apiUrlConfig.changePassword;
            var reqObj = $scope.changepassword;
            apiMethods.apiPOSTReq(url, reqObj).then(function (response) {
                console.log("service success !!!!!");
                
            }, function(response){
                console.log("service failure !!!!!");
                console.log(response);
            });
    	}
    }]);
})();