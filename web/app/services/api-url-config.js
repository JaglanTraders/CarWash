(function () {
    angular.module("carwash.myServices").factory('carwash.services.apiUrlConfig', function () {
        var basePath = "http://localhost:4000";
        return {
            login : basePath+"/api/login",
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