(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('ProductDetailController', ProductDetailController);

  ProductDetailController.$inject = ['$state', '$stateParams', 'Notify', 'Product', 'product'];
  function ProductDetailController($state, $stateParams, Notify, Product, product) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.product = product;
      _this.remove = remove;
    }

    // 診察料金を削除する
    function remove(product) {
      Notify.del(function() {
        Product.remove({clinicId: $stateParams.clinicId, productId: product.id}).$promise
          .then(function() {
            $state.go('app.dashboard.product');
            Notify.success('指定された診察料金を削除しました。');
          });
      });
    }

    constructor();
  }
})();
