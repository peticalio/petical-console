(() => {
  'use strict';

  function getClinics($rootScope, Clinic) {
    return Clinic.query().$promise
      .then((response) => {
        $rootScope.clinics = response;
        return response;
      });
  }

  function getClinic($rootScope, $stateParams, Clinic) {
    return Clinic.load({clinicId: $stateParams.clinicId}).$promise
      .then((response) => {
        $rootScope.clinic = response;
        return response;
      });
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
