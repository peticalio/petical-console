(() => {
  'use strict';

  // ワクチンの一覧を取得する
  function getClinicVaccines(clinic, ClinicVaccine) {
    return ClinicVaccine.query({clinicId: clinic.id}).$promise
      .then((response) => response);
  }

  // ワクチンの詳細を取得する
  function getClinicVaccine($stateParams, clinic, ClinicVaccine) {
    if (!$stateParams.vaccineId) {
      return {clinic: clinic};
    }
    return ClinicVaccine.load({clinicId: $stateParams.clinicId, vaccineId: $stateParams.vaccineId}).$promise
      .then((response) => response);
  }

  // ルート定義
  function ClinicVaccineRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.vaccine', {
        abstract: true,
        url: '^/clinics/:clinicId/vaccines',
      })
      // ワクチン一覧
      .state('app.dashboard.vaccine.list', {
        url: '/list',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/vaccine/list/list.html',
            controller:   'VaccineListController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          vaccines: getClinicVaccines
        }
      })
      // ワクチン登録フォーム
      .state('app.dashboard.vaccine.form', {
        url: '/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/vaccine/form/form.html',
            controller:   'VaccineFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          vaccine: getClinicVaccine
        }
      })
      // ワクチン更新フォーム
      .state('app.dashboard.vaccine.update', {
        url: '/:vaccineId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/vaccine/form/form.html',
            controller:   'VaccineFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          vaccine: getClinicVaccine
        }
      })
      // ワクチン詳細
      .state('app.dashboard.vaccine.detail', {
        url: '/:vaccineId',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/vaccine/detail/detail.html',
            controller:   'VaccineDetailController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          vaccine: getClinicVaccine
        }
      })
    ;
  }

  ClinicVaccineRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicVaccineRouter);

})();
