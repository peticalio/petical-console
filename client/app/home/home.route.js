(function() {
  'use strict';

  angular
    .module('petzApp')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  function routesConfig($stateProvider, $locationProvider, $urlRouterProvider){
    $stateProvider
      .state('app.home', {
        url: '^/',
        views: {
          '@app': {
            templateUrl:  'app/home/home.html',
            controller:   'HomeController',
            controllerAs: 'ctrl'
          }
        }
      })
    ;
  }
})();
