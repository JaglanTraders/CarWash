(function () {
    angular.module("carwash.myModels").factory('carwash.common.login.loginModel', function () {
       	return {
       		login : {
       			userName : "userId",
       			password : "password"
       		}
       	}
    });
})();