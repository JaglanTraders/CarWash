(function () {
    //declare all modules and their dependencies.
    angular.module('carwash.myControllers', []);
    angular.module('carwash.myDirectives', []);
    angular.module('carwash.myServices', []);
    angular.module('carwash.myModels', []);
    var application = angular.module('carwash.application', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'pascalprecht.translate',
        'carwash.myControllers',
        'carwash.myDirectives',
        'carwash.myServices',
        'carwash.myModels'
    ]);
    application.config(function ($translatePartialLoaderProvider, $translateProvider, $ocLazyLoadProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            modules:[
                {
                    name: 'homeController',
                    files: ['app/dashboard/home/home-controller.js']
                },
                {
                    name: 'picUpController',
                    files: ['app/dashboard/pic-up/pic-up-controller.js']
                },
                {
                    name: 'picUpFormController',
                    files: ['app/dashboard/pic-up/pic-up-form/pic-up-form-controller.js']
                },
                {
                    name: 'selectServicesController',
                    files: ['app/dashboard/select-services/select-services-controller.js']
                },
                {
                    name: 'verifyDetailsController',
                    files: ['app/dashboard/verify-details/verify-details-controller.js']
                },
                {
                    name: 'carwash.common.header.headerController',
                    files: ['app/common/header/header-controller.js']
                },
                {
                    name: 'carwash.common.l10n.localizationController',
                    files: ['app/common/l10n/localization-controller.js']
                },
                {
                    name: 'loginController',
                    files: ['app/common/login/login-controller.js']
                },
                {
                    name: 'carwash.common.user-dashboard.profile.profileController',
                    files: ['app/common/user-dashboard/profile/profile-controller.js']
                },
                {
                    name: 'carwash.common.user-dashboard.changepassword.changePasswordController',
                    files: ['app/common/user-dashboard/changepassword/changepassword-controller.js']
                },
                {
                    name: 'signUpController',
                    files: ['app/common/signUp/signUp-controller.js']
                },
                {
                    name: 'carwash.services.commonService',
                    files: ['app/services/common-services.js']
                },
                {
                    name: 'apiMethods',
                    files: ['app/services/api-methods.js']
                },
                {
                    name: 'carwash.services.apiUrlConfig',
                    files: ['app/services/api-url-config.js']
                },
                {
                    name: 'carwash.application.routes',
                    files: ['app/routes/routes.js']
                },
                // Directives
                {
                    name: 'formValidations',
                    files: ['app/directives/validations.js']
                },
                // Models
                {
                    name: 'loginModel',
                    files: ['app/common/login/login-model.js']
                },
                {
                    name : 'homeModel',
                    files : ['app/dashboard/home/home-model.js']
                },
                {
                    name : 'selectServicesModel',
                    files : ['app/dashboard/select-services/select-service-model.js']
                }
            ]
        });

       /* $translateProvider.translations('en',
            {
                "SIGN_IN_HEADING":"Please sign in.",
                "EMAIL":"Email address",
                "PASSWORD":"Password",
                "REMEMBER_ME":"Remember me",
                "SIGN_IN":"Sign in"
            });*/
       $translatePartialLoaderProvider.addPart('common/login');
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{part}-{lang}.json',
            loadFailureHandler:'MyErrorHandler'
        });
        $translateProvider.preferredLanguage("en_US");
        $translateProvider.fallbackLanguage("en_US");

    });
    application.run(function ($translate, $rootScope, $ocLazyLoad, $http) {
        $ocLazyLoad.load(['carwash.services.apiUrlConfig', 'carwash.services.apiMethods']);
        $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
            $translate.refresh();
        });
        $rootScope.$on('$routeChangeStart', function(next, current) {
            console.log("... you could trigger something here ...");
        });
    });
    application.factory('MyErrorHandler', function ($q, $log) {
        return function (part, lang) {
            $log.error('The "' + part + '/' + lang + '" part was not loaded.');
            return $q.when({});
        };
    });
})();