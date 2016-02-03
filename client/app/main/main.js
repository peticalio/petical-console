(function() {
  'use strict';

  angular
    .module('petzApp')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  function routesConfig($stateProvider, $locationProvider, $urlRouterProvider){
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl:      'app/main/main.html',
        controller:       'MainController',
        controllerAs:     'ctrl'
      })
    ;
  }
})();
