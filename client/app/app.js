'use strict';

angular
  .module('petzApp', [
    'petzApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap'
  ])

  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
