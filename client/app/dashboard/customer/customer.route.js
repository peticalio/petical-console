(function() {
  'use strict';

  RouteConfig.$inject = ['$stateProvider'];
  function RouteConfig($stateProvider){
    $stateProvider
      // 飼い主一覧
      .state('app.dashboard.customer', {
        url: '^/clinics/:clinicId/customers',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/customer.html',
            controller:   'CustomerController',
            controllerAs: 'ctrl'
          }
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
        resolve: {
          customer:       getEmpty
        }
      })
      // 飼い主インポート
      .state('app.dashboard.customer.import', {
        url: '/import',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/import/import.html',
            controller:   'CustomerImportController',
            controllerAs: 'ctrl'
          }
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
        resolve: {
          customer:       getCustomer,
          pets:           getPets,
          charts:         getCharts
        }
      })
      // 飼い主変更
      .state('app.dashboard.customer.detail.form', {
        url: '/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/form/form.html',
            controller:   'CustomerFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          customer:       getCustomer
        }
      })
    ;
  }

  function getEmpty(clinic) {
    return {clinic: clinic};
  }

  function getCustomers($stateParams, ClinicCustomer) {
    return ClinicCustomer.query({clinicId: $stateParams.clinicId}).$promise
      .then(function(response) {
        return response;
      });
  }

  function getCustomer($stateParams, ClinicCustomer) {
    return ClinicCustomer.load({clinicId: $stateParams.clinicId, customerId: $stateParams.customerId}).$promise
      .then(function(response) {
        return response;
      });
  }

  function getPets(customer, UserPet) {
    return UserPet.query({userId:customer.user.id}).$promise
      .then(function(response) {
        return response;
      });
  }

  function getCharts($stateParams, ClinicCustomerChart) {
    return ClinicCustomerChart.query({clinicId:$stateParams.clinicId, customerId:$stateParams.customerId}).$promise
      .then(function(response) {
        return response;
      });
  }

  angular.module('petzApp')
    .config(RouteConfig);

})();
