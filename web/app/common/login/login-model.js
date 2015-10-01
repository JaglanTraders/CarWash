(function () {
    angular.module("carwash.application").factory('carwash.common.login.loginModelService', function () {
       	return {
       		login : {
       			userName : "userId",
       			password : "password"
       		}
       	}
    });
})();