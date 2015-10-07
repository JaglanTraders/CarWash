(function () {

    angular.module('carwash.common').controller('carwash.common.user-dashboard.profile.profileController', ['$scope', '$state', 'carwash.services.apiUrlConfig', 'carwash.services.apiMethods', function ($scope, $state, apiUrlConfig, apiMethods) {
    	var url = apiUrlConfig.getMyAccount;
        //var reqObj = $scope.forgotPassword;
        apiMethods.apiGETReq(url).then(function (response) {
            console.log("my account success !!!!!");
            
        }, function(response){
            console.log("my account failure !!!!!");
            console.log(response);
        });

    }]);
})();