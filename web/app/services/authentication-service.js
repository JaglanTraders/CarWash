(function () {
    angular.module("carwash.myServices").factory('authenticationService', [
        '$rootScope',
        '$state',
        'commonService',
        function ($rootScope, $state, commonService) {
            var handleLoginAuthentication = function () {
                var obj = commonService.getObjFromLocalStore();
                if(obj.openOrder){
                    $state.go('home.orderConfirmation');
                }
                else{
                    $state.go("home.pickUp");
                }
            };

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    //console.log("on state change event");
                    var isLogin = commonService.getObjFromLocalStore();
                    if(isLogin != null && isLogin != "")
                        isLogin = true;
                    else
                        isLogin = false;

                    if( isLogin && toState.name == "login"){
                        event.preventDefault();
                        commonService.showInfoMsg("You are already logged in");
                        if(fromState.name == "" || fromState.name == null || fromState.name == undefined){
                            handleLoginAuthentication();
                            return null;
                        }
                    }
                    //else if(isLogin && (toState.name == "resetpassword")){
                    //    //if(isLogin.forcePasswordChange != 1 && isLogin.passwordExpired != true) {
                    //    event.preventDefault();
                    //    commonService.showErrorMsg("invalid access");
                    //    //}
                    //}
                    //else if(!isLogin && toState.name != "resetpassword" && toState.name != "login"){
                    //    event.preventDefault();
                    //    $state.go("login", {referal: toState.name, params : toParams});
                    //    commonService.showErrorMsg("Please login to continue");
                    //    return;
                    //}
                }
            );
            $rootScope.$on('$stateChangeError',
                function(event, unFoundState, fromState, fromParams) {
                    console.log("state not found");
                    console.log(unFoundState);
                    console.log(fromState);
                }
            );

            return {
                handleLoginAuthentication : handleLoginAuthentication
            }
        }
    ]);
})();