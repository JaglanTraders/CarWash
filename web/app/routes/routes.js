'use strict';
(function () {
    angular.module('carwash.application').config( function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                //controller: 'carwash.common.login.loginController',
                //templateUrl:'app/common/login/login.tpl.html'
                views: {
                    "": {
                        controller: 'loginController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/common/login/login.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        console.log("loading login controller");
                        return $ocLazyLoad.load([
                            'loginModel',
                            'loginController'
                        ]);
                    }]
                }
            })
            .state('signUp', {
                url: '/register',
                //controller: 'carwash.common.login.loginController',
                //templateUrl:'app/common/login/login.tpl.html'
                views: {
                    "": {
                        controller: 'signUpController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/common/signUp/signUp.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        console.log("loading signUp controller");
                        return $ocLazyLoad.load([
                            'signUpController'
                        ]);
                    }]
                }
            })
            .state('home', {
                url: '/home',
                //controller: 'carwash.common.login.loginController',
                //templateUrl:'app/common/login/login.tpl.html'
                views: {
                    "": {
                        controller: 'homeController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/dashboard/home/home.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'homeController'
                        ]);
                    }]
                }
            })
            .state('home.pickUp', {
                url: '/pic-up',
                views: {
                    "": {
                        controller: 'picUpController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/dashboard/pic-up/pic-up.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'picUpController'
                        ]);
                    }]
                }
            })
            .state('home.selectServices', {
                url: '/select-services',
                views: {
                    "": {
                        controller: 'selectServicesController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/dashboard/select-services/select-services.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'selectServicesModel',
                            'selectServicesController'
                        ]);
                    }]
                }
            })
            .state('home.verifyDetails', {
                url: '/verify-details',
                views: {
                    "": {
                        controller: 'verifyDetailsController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/dashboard/verify-details/verify-details.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'verifyDetailsController'
                        ]);
                    }]
                }
            })
            .state('profile', {
                url: '/profile',
                //controller: 'carwash.common.login.loginController',
                //templateUrl:'app/common/login/login.tpl.html'
                views: {
                    "": {
                        controller: 'carwash.common.user-dashboard.profile.profileController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/common/user-dashboard/profile/profile.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        console.log("loading profile controller");
                        return $ocLazyLoad.load(['carwash.common.user-dashboard.profile.profileController']);
                    }]
                }
            })
            .state('changepassword', {
                url: '/changepassword',
                //controller: 'carwash.common.login.loginController',
                //templateUrl:'app/common/login/login.tpl.html'
                views: {
                    "": {
                        controller: 'carwash.common.user-dashboard.changepassword.changePasswordController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/common/user-dashboard/changepassword/changepassword.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        console.log("loading changepassword controller");
                        return $ocLazyLoad.load([
                            'carwash.common.user-dashboard.changepassword.changePasswordController'
                        ]);
                    }]
                }
            })
            .state('resetpassword', {
                url: '/resetpassword/:uuid',
                //controller: 'carwash.common.login.loginController',
                //templateUrl:'app/common/login/login.tpl.html'
                views: {
                    "": {
                        controller: 'carwash.common.user-dashboard.changepassword.changePasswordController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/common/user-dashboard/changepassword/changepassword.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        console.log("loading changepassword controller");
                        return $ocLazyLoad.load([
                            'carwash.common.user-dashboard.changepassword.changePasswordController'
                        ]);
                    }]
                }
            });
        $urlRouterProvider.when('','/login');
        //$locationProvider.html5Mode(true);
        //$urlRouterProvider.otherwise('/home');
    });
})();