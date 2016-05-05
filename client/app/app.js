'use strict';

angular
  .module('petzApp', [
    'petzApp.util',
    'petz.core',
    'petz.api',
    'petz.vendor',
    'petz.env',
    'ngMaterial',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'ui.validate',
    'ui.gravatar',
    'ui.bootstrap',
    'angularMoment',
    'md.data.table',
    'mwl.calendar',
    'ngHandsontable',
    'vcRecaptcha',
    'nvd3'
  ])

  // base config
  .config(['$urlRouterProvider', '$locationProvider', '$httpProvider', function($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true).hashPrefix('!');

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
      .primaryPalette('cyan', {
        'default': '600'
      })
      .accentPalette('yellow')
      .warnPalette('red')
      .backgroundPalette('grey');

    $mdThemingProvider
      .theme('content')
      .primaryPalette('grey',{
        'default': '100',
        'hue-1': '700',
        'hue-2': '300',
        'hue-3': '800'
      })
      .accentPalette('amber')
      .warnPalette('red')
      .backgroundPalette('grey');

    $mdThemingProvider
      .theme('fab')
      .primaryPalette('pink')
      .accentPalette('indigo')
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

  // ISO-8601対応（FIXME リファクタリングしても良いかも）
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      var ISO8601_REGEXP = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

      function convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== 'object') {
          return input;
        }

        for (var key in input) {
          if (input.hasOwnProperty(key)) {
            var value = input[key];
            // Check for string properties which look like dates.
            if (typeof value === 'string' && value.length >= 10 && value.match(ISO8601_REGEXP)) {
              var date = moment(value);
              input[key] = new Date(date.unix() * 1000);
            } else if (typeof value === 'object') {
              // Recurse into object
              convertDateStringsToDates(value);
            }
          }
        }
      }

      // レスポンスデータにISO-8601形式の日付が含まれていれば、自動的にDateオブジェクトに変換する
      $httpProvider.defaults.transformResponse.push(function(responseData){
        convertDateStringsToDates(responseData);
        return responseData;
      });
    }
  ])

  .constant('timetable', [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30'
  ])
;
