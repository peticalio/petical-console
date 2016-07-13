(() => {
  'use strict';

  function getEmpty(clinic) {
    return {clinic: clinic};
  }

  function getCustomers($stateParams, ClinicCustomer) {
    return ClinicCustomer.query({clinicId: $stateParams.clinicId}).$promise
      .then((response) => response);
  }

  function getCustomer($stateParams, ClinicCustomer) {
    return ClinicCustomer.load({clinicId: $stateParams.clinicId, customerId: $stateParams.customerId}).$promise
      .then((response) => response);
  }

  // 飼い主のペットを取得する
  function getCustomerPets(clinic, $stateParams, ClinicCustomerPet) {
    return ClinicCustomerPet.query({clinicId: clinic.id, customerId: $stateParams.customerId}).$promise
      .then((response) => response);
  }
  // 飼い主のカルテを取得する
  function getCustomerCharts(clinic, $stateParams, ClinicCustomerChart) {
    return ClinicCustomerChart.query({clinicId: clinic.id, customerId: $stateParams.customerId}).$promise
      .then((response) => response);
  }

  function RouteConfig($stateProvider){
    $stateProvider
      // 飼い主一覧
      .state('app.dashboard.customer', {
        url: '^/clinics/:clinicId/customers',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/list/list.html',
            controller:   'CustomerListController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '飼い主検索'
        },
        resolve: {
          customers:      getCustomers
        }
      })
      // 飼い主新規登録フォーム
      .state('app.dashboard.customer.form', {
        url: '/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/form/form.html',
            controller:   'CustomerFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '飼い主新規登録'
        },
        resolve: {
          customer:       getEmpty
        }
      })
      // 飼い主アップロード
      .state('app.dashboard.customer.import', {
        url: '/import',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/import/import.html',
            controller:   'CustomerImportController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '飼い主インポート'
        }
      })
      // 飼い主アップロード
      .state('app.dashboard.customer.upload', {
        url: '/upload',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/upload/upload.html',
            controller:   'CustomerUploadController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '飼い主一括登録'
        }
      })
      // 飼い主変更
      .state('app.dashboard.customer.update', {
        url: '/:customerId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/form/form.html',
            controller:   'CustomerFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '飼い主更新'
        },
        resolve: {
          customer:       getCustomer
        }
      })
      // 飼い主詳細
      .state('app.dashboard.customer.detail', {
        url: '/:customerId',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/detail/detail.html',
            controller:   'CustomerDetailController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '飼い主詳細'
        },
        resolve: {
          customer:       getCustomer,
          pets:           getCustomerPets,
          charts:         getCustomerCharts
        }
      })
    ;
  }

  RouteConfig.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(RouteConfig);

})();
