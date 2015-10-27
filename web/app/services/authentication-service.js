(function () {
    angular.module("carwash.myServices").factory('authenticationService', [
        '$rootScope',
        '$state',
        'commonService',
        function ($rootScope, $state, commonService) {

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
                        if(fromState.name == "" || fromState.name == null || fromState.name == undefined){
                            $state.go("home.pickUp");
                            return null;
                        }
                    }
                    else if(isLogin && (toState.name == "home.pickUp" || toState.name == "home.selectServices" || toState.name == "home.verifyDetails" || toState.name == "home.paymentMode")){
                        if(commonService.getObjFromLocalStore().openOrder) {
                            event.preventDefault();
                            $state.go('home.orderConfirmation');
                        }
                    }
                    else if(!isLogin && (toState.name != "signUp" || toState.name != "login")){
                        event.preventDefault();
                        $state.go("login");
                    }
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

            }
        }
    ]);
})();