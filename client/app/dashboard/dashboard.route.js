(() => {
  'use strict';

  function getClinics($rootScope, MyClinic) {
    return MyClinic.query().$promise
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
        ncyBreadcrumb: {
          label: 'ダッシュボード'
        },
        resolve: {
          clinics:        getClinics,
          clinic:         getClinic
        }
      })
      .state('app.dashboard.form', {
        url: '^/clinics/:clinicId/form',
        views: {
          '@app': {
            templateUrl:  'app/main/clinic/form/form.html',
            controller:   'ClinicFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '動物病院基本情報編集'
        }
      })
    ;
  }

  DashboardRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(DashboardRouter);

})();
