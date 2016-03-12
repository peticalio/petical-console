(() => {
  'use strict';

  function getClinicProducts(clinic, ClinicProduct) {
    return ClinicProduct.query({clinicId: clinic.id}).$promise
      .then((response) => response);
  }

  function empty() {
    return {taxType:'EXCLUSIVE', taxRate:0.08};
  }

  function getProduct($stateParams, Product) {
    return Product.get({clinicId: $stateParams.clinicId, productId: $stateParams.productId});
  }

  function ClinicProductRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.product', {
        abstract: true,
        url: '^/clinics/:clinicId/products'
      })
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
          product: empty
        }
      })
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
          product: getProduct
        }
      })
      .state('app.dashboard.product.detail.form', {
        url: '/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/product/form/form.html',
            controller:   'ProductFormController',
            controllerAs: 'ctrl'
          }
        }
      })
    ;
  }

  ClinicProductRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicProductRouter);

})();
