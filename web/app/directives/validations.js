/**
 *  Custom validation directive
 *  @author Jagdeep
 *
 *  How to use
 *  load this directive and write in html
 *  Example :
 *  <form name="anyName" my-validation> optional attributes : on-success-cls="class name", on-error-cls="class name", err-msg-cls="class name"
 *      <input type="anyType" ng-model="modelName" required
 *      err-msg-required="required message"
 *      err-msg-pattern = "pattern message"
 *      err-msg-min = "min message"
 *      err-msg-max = "max message"
 *      err-msg-minlength = "minlength message"
 *      err-msg-maxlength = "maxlength message"
 *      err-msg-number = "number message"
 *      />
 *  </form>
 *  given err msg validation only it will validate
 */
(function () {
    angular.module('carwash.myDirectives').directive('compareTo', ['$parse', function ($parse) {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }]);
    angular.module('carwash.myDirectives').directive('myValidation', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            compile : function (tElement, tAttrs, transclude) {
                jQuery.noConflict();
                jQuery(document).ready(function($) {
                    var formName = tAttrs.name;
                    var onSuccessCls = tAttrs.onSuccessCls || "has-success";
                    var onErrorCls = tAttrs.onErrorCls || "has-error";
                    var errMsgCls = tAttrs.errMsgCls || "error-msg";

                    var createErrMsgTemplate = function (elem) {
                        var attrs = $(elem)[0].attributes;
                        var elemName = $(elem).attr("name");
                        var htmlStr = "";
                        for (var i = 0; i < attrs.length; i++) {
                            if (attrs[i].name.indexOf("err-msg") == 0) {
                                if (attrs[i].name == 'err-msg-required') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.required">' + attrs[i].value + '</p>';
                                }
                                else if (attrs[i].name == 'err-msg-pattern') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.pattern">' + attrs[i].value + '</p>';
                                }
                                else if (attrs[i].name == 'err-msg-email') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.email">' + attrs[i].value + '</p>';
                                }
                                else if (attrs[i].name == 'err-msg-number') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.number">' + attrs[i].value + '</p>';
                                }
                                else if (attrs[i].name == 'err-msg-min') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.min">' + attrs[i].value + '</p>';
                                }
                                else if (attrs[i].name == 'err-msg-max') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.max">' + attrs[i].value + '</p>';
                                }
                                else if (attrs[i].name == 'err-msg-maxlength') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.maxlength">' + attrs[i].value + '</p>';
                                }
                                else if (attrs[i].name == 'err-msg-minlength') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.minlength">' + attrs[i].value + '</p>';
                                }
                                else if (attrs[i].name == 'err-msg-compareto') {
                                    htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.compareTo">' + attrs[i].value + '</p>';
                                }
                            }
                        }
                        return htmlStr;
                    };

                    var createErrTemplate = function (elem) {
                        var errMsgHtml = createErrMsgTemplate(elem);
                        var elemName = $(elem).attr("name");
                        var errHtml = '<span ng-show="' + formName + '.' + elemName + '.$invalid && ' + formName + '.' + elemName + '.$dirty">' + errMsgHtml + '</span>';
                        return errHtml;
                    };

                    var doValidate = function (elem) {
                        // for error class at parent div
                        var elemName = $(elem).attr("name");
                        if (elemName != null && elemName != undefined) {
                            var errClassStr = "{'" + onErrorCls + "' : " + formName + "." + elemName + ".$invalid && " + formName + "." + elemName + ".$dirty, '" + onSuccessCls + "' : !" + formName + "." + elemName + ".$invalid && " + formName + "." + elemName + ".$dirty}";
                            $(elem).parent().closest('div').attr("ng-class", errClassStr);
                            // for error messages
                            var errTemplates = createErrTemplate(elem);
                            $(elem).parent().append(errTemplates);
                        }
                        else{
                            console.log("please type input element name for below item");
                            console.log($(elem));
                        }
                    };

                    var inputElem = $(tElement).find("input, textarea, select");
                    for (var i = 0; i < inputElem.length; i++) {
                        var isReq = $(inputElem[i]).attr("required");
                        var isNgReq = $(inputElem[i]).attr("ng-required");
                        //if ((isReq && isReq != undefined) || (isNgReq && isNgReq != undefined)) {
                            doValidate(inputElem[i]);
                        //}
                    }
                });
            }
        };
    }]);
})();
