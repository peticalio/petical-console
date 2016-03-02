'use strict';

angular
  .module('petzApp', [
    'petzApp.constants',
    'petz.core',
    'petz.api',
    'petz.vendor',
    'petz.env',
    'ngMaterial',
    'md.data.table',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'ui.validate',
    'ui.gravatar',
    'ui.bootstrap',
    'googlechart'
  ])

  // base config
  .config(['$urlRouterProvider', '$locationProvider', '$httpProvider', function($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('AuthInterceptor');
  }])

  // angular material theme config
  .config(['$mdIconProvider', '$mdThemingProvider', function($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider
      .fontSet('fa', 'fontawesome')
      .defaultFontSet('fontawesome')
      .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);

    $mdThemingProvider
      .theme('console')
      .primaryPalette('cyan')
      .accentPalette('yellow')
      .warnPalette('pink')
      .backgroundPalette('grey');

    $mdThemingProvider
      .theme('content')
      .primaryPalette('grey',{
        'default': '100',
        'hue-1': '700',
        'hue-2': '300',
        'hue-3': '800'
      })
      .accentPalette('orange')
      .warnPalette('red')
      .backgroundPalette('grey');

    $mdThemingProvider
      .theme('sidemenu')
      .primaryPalette('grey',{
        'default': '50',
        'hue-1': '700',
        'hue-2': '300',
        'hue-3': '800'
      });

    $mdThemingProvider
      .theme('progress')
      .primaryPalette('grey',{
        'default': '800'
      });

    $mdThemingProvider.setDefaultTheme('console');
  }])

  // gravator config
  .config(['gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 30,
      'default': 'retro'
    };
    gravatarServiceProvider.secure = true;
//    gravatarServiceProvider.protocol = 'https';
  }])
;
