(function() {
  'use strict';

  angular
    .module('petzApp')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  function routesConfig($stateProvider, $locationProvider, $urlRouterProvider){
    $stateProvider
      .state('app.dashboard', {
        url: '^/clinics/:clinicId/dashboard',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/dashboard.html',
            controller:   'DashboardController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          clinics:        function() {return [];},
          clinic:         function() {return {};}
        }
      })
    ;
  }
})();
