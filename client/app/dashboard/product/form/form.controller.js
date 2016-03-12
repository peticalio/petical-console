(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('ProductFormController', ProductFormController);

  ProductFormController.$inject = ['$state', '$stateParams', 'Notify', 'Product', 'product'];
  function ProductFormController($state, $stateParams, Notify, Product, product) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.product = product;
      _this.save = save;
      _this.update = update;
    }

    // 診察料金を登録する
    function save(product) {
      Product.save({clinicId: $stateParams.clinicId}, product).$promise
        .then(function(response) {
          $state.go('app.dashboard.product');
          Notify.success('診察料金を新しく登録しました。');
        });
    }

    // 診察料金を更新する
    function update(product) {
      Product.update({clinicId: $stateParams.clinicId, productId: product.id}, product).$promise
        .then(function(response) {
          $state.go('app.dashboard.product');
          Notify.success('診察料金の情報を更新しました。');
        });
    }

    constructor();
  }
})();
