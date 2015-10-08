(function () {
    angular.module("carwash.myServices").factory('commonService', function () {


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
                showErrorMsg(response.data.message);
            }
            else
                showErrorMsg("Server Failure");
        };

        return {
            showSuccessMsg: showSuccessMsg,
            showInfoMsg : showInfoMsg,
            showWarningMsg : showWarningMsg,
            showErrorMsg : showErrorMsg,
            onApiResponseError : onApiResponseError
        }
    });
})();