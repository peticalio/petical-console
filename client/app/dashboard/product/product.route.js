(() => {
  'use strict';

  function getClinicProducts(clinic, ClinicProduct) {
    return ClinicProduct.query({clinicId: clinic.id}).$promise
      .then((response) => response);
  }

  function getClinicProduct($stateParams, clinic, ClinicProduct) {
    if (!$stateParams.productId) {
      return {taxType: 'EXCLUSIVE', taxRate: 0.08};
    }
    return ClinicProduct.load({clinicId: clinic.id, productId: $stateParams.productId}).$promise
      .then((response) => response);
  }

  function ClinicProductRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.product', {
        abstract: true,
        url: '^/clinics/:clinicId/products'
      })
      // 商品一覧
      .state('app.dashboard.product.list', {
        url: '/list',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/product/list/list.html',
            controller:   'ProductListController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          products: getClinicProducts
        }
      })
      // 商品登録フォーム
      .state('app.dashboard.product.form', {
        url: '/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/product/form/form.html',
            controller:   'ProductFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          product: getClinicProduct
        }
      })
      // 商品更新フォーム
      .state('app.dashboard.product.update', {
        url: '/:productId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/product/form/form.html',
            controller:   'ProductFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          product: getClinicProduct
        }
      })
      // 商品詳細
      .state('app.dashboard.product.detail', {
        url: '/:productId',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/product/detail/detail.html',
            controller:   'ProductDetailController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          product: getClinicProduct
        }
      })
    ;
  }

  ClinicProductRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicProductRouter);

})();
