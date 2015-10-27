(function () {
    angular.module("carwash.myServices").factory('apiUrlConfig', function () {
        var basePath = "http://localhost:4000/api";
        return {
            login : basePath+"/login",
            signUp : basePath+"/signUp",
            getServiceTypes : basePath+"/serviceTypes",
            applyVoucherCode : basePath+"/applyVoucher",
            logout : basePath+"/logout",
            placeOrder : basePath+"/place-order",
            openOrder : basePath+"/open-order",
            cancelOrder : basePath+"/cancel-order",
            isServiceAvailable : basePath+"/isServiceAvailable",
            getMyAccount : basePath+"/account",
            changePassword : basePath+"/change-password",

            isLoggedIn : basePath+"/isLoggedIn",
            forgotPassword : basePath+"/user/forgotPassword",
            resetPassword : basePath+"/user/resetPassword",
            resetPasswordAuth : basePath+"/user/resetPassword"

        }
    });
})();