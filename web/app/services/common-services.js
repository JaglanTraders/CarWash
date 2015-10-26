(function () {
    angular.module("carwash.myServices").factory('commonService',[
        '$state',
        '$rootScope',
        function ($state, $rootScope) {

            var showSuccessMsg = function(msg){
                jQuery.noConflict();
                jQuery(document).ready(function($){
                    window.scrollTo(0, 0);
                    var alertHtml = '<div class="col-sm-offset-4 col-sm-4" style="top:35px;"><div class="alert alert-success fade in text-center">'+
                            '<a  class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success! </strong> '+ msg +
                        '</div></div>';
                    $("body").prepend(alertHtml);
                });
            };

            var showInfoMsg = function(msg){
                jQuery.noConflict();
                jQuery(document).ready(function($){
                    window.scrollTo(0, 0);
                    var alertHtml = '<div class="col-sm-offset-4 col-sm-4" style="top:35px;"><div class="alert alert-info fade in text-center">'+
                        '<a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Info!</strong> '+ msg +
                        '</div></div>';
                    $("body").prepend(alertHtml);
                });
            };

            var showWarningMsg = function(msg){
                jQuery.noConflict();
                jQuery(document).ready(function($){
                    window.scrollTo(0, 0);
                    var alertHtml = '<div class="col-sm-offset-4 col-sm-4" style="top:35px;"><div class="alert alert-warning fade in text-center">'+
                        '<a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning! </strong> '+ msg +
                        '</div></div>';
                    $("body").prepend(alertHtml);
                });
            };

            var showErrorMsg = function(msg){
                jQuery.noConflict();
                jQuery(document).ready(function($){
                    window.scrollTo(0, 0);
                    var alertHtml = '<div class="col-sm-offset-4 col-sm-4" style="top:35px;"><div class="alert alert-danger fade in text-center">'+
                        '<a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error! </strong> '+ msg +
                        '</div></div>';
                    $("body").prepend(alertHtml);
                });
            };

            var onApiResponseError = function (response) {
                if(response.data != null){
                    if(response.data.message == "Unauthorized access") {
                        $state.go("login");
                    }
                    showErrorMsg(response.data.message);
                }
                else
                    showErrorMsg("Server Failure");
            };

            var localStoreDBName = "carwashDB";
            var saveObjToLocalStore = function (obj) {
                if(obj != null && obj != undefined && obj != "")
                    $rootScope.loggedInStatus = true;
                var obj2Json = JSON.stringify(obj);
                $rootScope.loggedInUserName = obj.userName;
                localStorage.setItem(localStoreDBName,obj2Json);
            };

            var getObjFromLocalStore = function(){
                var data = localStorage.getItem(localStoreDBName);
                return JSON.parse(data);
            };

            var logout = function () {
                localStorage.setItem(localStoreDBName, null);
            };
            
            return {
                showSuccessMsg: showSuccessMsg,
                showInfoMsg : showInfoMsg,
                showWarningMsg : showWarningMsg,
                showErrorMsg : showErrorMsg,
                onApiResponseError : onApiResponseError,
                saveObjToLocalStore : saveObjToLocalStore,
                getObjFromLocalStore : getObjFromLocalStore,
                logout : logout
            }
        }
    ]);
})();