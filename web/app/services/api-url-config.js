(function () {
    angular.module("carwash.application").factory('carwash.services.apiUrlConfig', function () {
        var basePath = "http://localhost:8080";
        return {
            login : basePath+"/login",
            logout : basePath+"/signOut",
            isLoggedIn : basePath+"/isLoggedIn",
            forgotPassword : basePath+"/user/forgotPassword",
            changePassword : basePath+"/user/changePassword",
            resetPassword : basePath+"/user/resetPassword",
            resetPasswordAuth : basePath+"/user/resetPassword",
            getMyAccount : basePath+"/user/myAccount"
        }
    });
})();