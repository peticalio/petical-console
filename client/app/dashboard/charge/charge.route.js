(() => {
  'use strict';

  function getClinicCharges(clinic, ClinicCharge) {
    return ClinicCharge.query({clinicId: clinic.id}).$promise
      .then((response) => response);
  }

  function getClinicCharge($stateParams, clinic, ClinicCharge) {
    if (!$stateParams.chargeId) {
      return {taxType: 'EXCLUSIVE', taxRate: 0.08, insurance: false};
    }
    return ClinicCharge.load({clinicId: clinic.id, chargeId: $stateParams.chargeId}).$promise
      .then((response) => response);
  }

  function ClinicChargeRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.charge', {
        // abstract: true,
        url: '^/clinics/:clinicId/charges',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/charge/list/list.html',
            controller:   'ChargeListController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '診察料金'
        },
        resolve: {
          charges: getClinicCharges
        }
      })
      // 商品登録フォーム
      .state('app.dashboard.charge.form', {
        url: '/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/charge/form/form.html',
            controller:   'ChargeFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '登録フォーム'
        },
        resolve: {
          charge: getClinicCharge
        }
      })
      // 商品更新フォーム
      .state('app.dashboard.charge.update', {
        url: '/:chargeId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/charge/form/form.html',
            controller:   'ChargeFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '更新フォーム'
        },
        resolve: {
          charge: getClinicCharge
        }
      })
      // 商品詳細
      .state('app.dashboard.charge.detail', {
        url: '/:chargeId',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/charge/detail/detail.html',
            controller:   'ChargeDetailController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '詳細'
        },
        resolve: {
          charge: getClinicCharge
        }
      })
    ;
  }

  ClinicChargeRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicChargeRouter);

})();
