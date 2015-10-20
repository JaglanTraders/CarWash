(function () {
    angular.module("carwash.myServices").factory('apiUrlConfig', function () {
        var basePath = "http://localhost:4000/api";
        return {
            login : basePath+"/login",
            signUp : basePath+"/signUp",
            getServiceTypes : basePath+"/serviceTypes",
            applyVoucherCode : basePath+"/applyVoucher",
            logout : basePath+"/logout",

            isLoggedIn : basePath+"/isLoggedIn",
            forgotPassword : basePath+"/user/forgotPassword",
            changePassword : basePath+"/user/changePassword",
            resetPassword : basePath+"/user/resetPassword",
            resetPasswordAuth : basePath+"/user/resetPassword",
            getMyAccount : basePath+"/user/myAccount"
        }
    });
})();