(() => {
  'use strict';

  function getClinics(Clinic) {
    return Clinic.query().$promise
      .then((response) => response);
  }

  function getClinic($stateParams, Clinic) {
    return Clinic.load({clinicId: $stateParams.clinicId}).$promise
      .then((response) => response);
  }

  function DashboardRouter($stateProvider) {
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
          clinics:        getClinics,
          clinic:         getClinic
        }
      })
    ;
  }

  DashboardRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(DashboardRouter);

})();
