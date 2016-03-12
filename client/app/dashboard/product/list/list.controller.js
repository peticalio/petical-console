(() => {
  'use strict';

  class ProductListController {
    constructor($state, toaster, ClinicProduct, clinic, products) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicProduct = ClinicProduct;
      this.clinic = clinic;
      this.products = products;
    }

    // 商品マスタをリフレッシュする
    refresh() {
      this.ClinicProduct.fetch({clinicId: this.clinic.id}).$promise
        .then((response) => {
          this.products = response;
          this.toaster.info('商品マスタの一覧を更新しました。');
        });
    }
  }

  ProductListController.$inject = ['$state', 'toaster', 'ClinicProduct', 'clinic', 'products'];
  angular.module('petzApp')
    .controller('ProductListController', ProductListController);

})();
