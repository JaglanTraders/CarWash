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
                        controller: 'carwash.common.login.loginController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/common/login/login.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        console.log("loading login controller");
                        return $ocLazyLoad.load([
                            'carwash.common.login.loginModelService',
                            'carwash.services.apiUrlConfig',
                            'carwash.services.apiMethods',
                            'carwash.common.login.loginController'
                        ]);
                    }]
                }
            })
            .state('signUp', {
                url: '/signUp',
                //controller: 'carwash.common.login.loginController',
                //templateUrl:'app/common/login/login.tpl.html'
                views: {
                    "": {
                        controller: 'carwash.common.signUp.signUpController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/common/signUp/signUp.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        console.log("loading signUp controller");
                        return $ocLazyLoad.load(['carwash.common.signUp.signUpController']);
                    }]
                }
            })
            .state('home', {
                url: '/home',
                //controller: 'carwash.common.login.loginController',
                //templateUrl:'app/common/login/login.tpl.html'
                views: {
                    "": {
                        controller: 'carwash.common.home.homeController', // This view will use AppCtrl loaded below in the resolve
                        templateUrl: 'app/common/home/home.tpl.html'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        console.log("loading home controller");
                        return $ocLazyLoad.load(['carwash.common.home.homeController']);
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
                            'carwash.services.apiUrlConfig',
                            'carwash.services.apiMethods',
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
                            'carwash.services.apiUrlConfig',
                            'carwash.services.apiMethods',
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