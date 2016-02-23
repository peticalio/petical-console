(function() {
  'use strict';

  function routesConfig($stateProvider, $locationProvider, $urlRouterProvider){
    $stateProvider
      .state('app.dashboard', {
        url: '^/clinics/:clinicId/dashboard',
        data: {
          showDashboardMenu: true
        },
        views: {
          '@app': {
            templateUrl:  'app/dashboard/dashboard.html',
            controller:   'DashboardController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          clinics:        getClinics,
          clinic:         getClinic
        }
      })
    ;
  }

  function getClinics(Clinic) {
    return Clinic.query().$promise
      .then(function(response) {
        return response;
      });
  }

  function getClinic($stateParams, Clinic) {
    return Clinic.load({clinicId: $stateParams.clinicId}).$promise
      .then(function(response) {
        return response;
      });
  }

  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  angular
    .module('petzApp')
    .config(routesConfig);

})();
