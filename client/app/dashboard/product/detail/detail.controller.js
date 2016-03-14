(() => {
  'use strict';

  class ProductDetailController {
    constructor($state, dialog, toaster, ClinicProduct, clinic, product) {
      this.$state = $state;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicProduct = ClinicProduct;
      this.clinic = clinic;
      this.product = product;
    }

    delete(event, product) {
      this.dialog.delete(event, product)
        .then(() => this.ClinicProduct.delete({clinicId: this.clinic.id, chartId: product.id}))
        .then(() => this.ClinicProduct.fetch({clinicId: this.clinic.id}))
        .then(() => {
          this.toaster.info('商品・料金マスタを削除しました。');
          this.$state.go('app.dashboard.product.list');
        });
    }
  }

  ProductDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicProduct', 'clinic', 'product'];
  angular.module('petzApp')
    .controller('ProductDetailController', ProductDetailController);

})();
