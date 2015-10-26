(function () {

    angular.module('carwash.myControllers').controller('profileController', [
        '$scope',
        '$state',
        'apiUrlConfig',
        'apiMethods',
        function ($scope, $state, apiUrlConfig, apiMethods) {
            var url = apiUrlConfig.getMyAccount;
            //var reqObj = $scope.forgotPassword;
            apiMethods.apiGETReq(url).then(function (response) {
                console.log("my account success !!!!!");

            }, function(response){
                console.log("my account failure !!!!!");
                console.log(response);
            });
        }
    ]);
})();