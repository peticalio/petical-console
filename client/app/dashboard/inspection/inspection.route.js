(() => {
  'use strict';

  function getClinicInspections(clinic, ClinicInspection) {
    return ClinicInspection.query({clinicId: clinic.id}).$promise
      .then((response) => response);
  }

  function getClinicInspection($stateParams, clinic, ClinicInspection) {
    if (!$stateParams.inspectionId) {
      return {taxType: 'EXCLUSIVE', taxRate: 0.08, insurance: false};
    }
    return ClinicInspection.load({clinicId: clinic.id, inspectionId: $stateParams.inspectionId}).$promise
      .then((response) => response);
  }

  function ClinicInspectionRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.inspection', {
        // abstract: true,
        url: '^/clinics/:clinicId/inspections',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/inspection/list/list.html',
            controller:   'InspectionListController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '診察料金管理'
        },
        resolve: {
          inspections: getClinicInspections
        }
      })
      // 商品登録フォーム
      .state('app.dashboard.inspection.form', {
        url: '/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/inspection/form/form.html',
            controller:   'InspectionFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '新規登録'
        },
        resolve: {
          inspection: getClinicInspection
        }
      })
      // 商品更新フォーム
      .state('app.dashboard.inspection.update', {
        url: '/:inspectionId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/inspection/form/form.html',
            controller:   'InspectionFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '更新'
        },
        resolve: {
          inspection: getClinicInspection
        }
      })
      // 商品詳細
      .state('app.dashboard.inspection.detail', {
        url: '/:inspectionId',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/inspection/detail/detail.html',
            controller:   'InspectionDetailController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '診察料金詳細'
        },
        resolve: {
          inspection: getClinicInspection
        }
      })
    ;
  }

  ClinicInspectionRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicInspectionRouter);

})();
