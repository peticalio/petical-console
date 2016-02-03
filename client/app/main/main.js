'use strict';

angular.module('petzApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
