// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// netstat -tulpn
var app = angular.module('starter',
        [
            'ionic',
            'CategoryMod',
            'HomeMod',
            'ProductMod',
            'RegisterMod',
            'AccountMod',
            'ngCordova'
        ]
        );
app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(5);
    $stateProvider
            .state('offline', {
                url: '/offline',
                templateUrl: 'template/offline.html',
                controller: 'HomeCtrl'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'template/menu.html',
                controller: 'HomeCtrl'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'template/category.html',
                        controller: 'CategoryCtrl'
                    }
                }
            })
            .state('app.category', {
                url: '/category/:cat_id/:sub_cat_id/:name',
                views: {
                    'menuContent': {
                        templateUrl: 'template/category.html',
                        controller: 'CategoryCtrl'
                    }
                }
            })
            .state('app.product', {
                url: '/product/:product_id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/product.html',
                        controller: 'ProductCtrl'
                    }
                }
            })
            .state('app.signup', {
                url: '/signup',
                views: {
                    'menuContent': {
                        templateUrl: 'template/register.html',
                        controller: 'RegisterCtrl'
                    }
                }
            })
            .state('app.account', {
                url: '/account',
                views: {
                    'menuContent': {
                        templateUrl: 'template/account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });
    ;
    $urlRouterProvider.otherwise('/app/home');
});
app.run(function ($ionicPlatform, $rootScope, $localStorage, $cordovaNetwork, $cordovaSplashscreen, $location) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            $cordovaSplashscreen.hide();
            $cordovaNetwork.watchOffline();
            $cordovaNetwork.watchOnline();
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

    });
    $rootScope.$on('networkOffline', function () {
        $location.path('/offline');
    });
    $rootScope.$on('networkOnline', function () {
        $location.path('/app/home');
    });
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log(toState.name + " to state");
        console.log(fromState.name + "from state");
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            if ($cordovaNetwork.isOffline() && toState.name != 'offline') {
                return;
            }
        }

//        console.log(fromState);
        if (toState.name == 'app.signup' && fromState) {
            if (fromState.name != "") {
                var url = fromState.url;
                if (fromParams && url) {
                    for (var key in fromParams) {
                        var value = fromParams[key];
                        url = url.replace(':' + key, value);
                    }
                    if (!$localStorage.previous) {
                        $localStorage.previous = {};
                    }
                    $localStorage.previous.url = '/app' + url;
                    console.log(url + 'set as previous url');
                }

            }
        }
//        console.log(toState);
//        console.log(toParams);
//        console.log(fromState);
//        console.log(fromParams);
    })
})
