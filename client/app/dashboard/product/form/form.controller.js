(() => {
  'use strict';

  class ProductFormController {
    constructor($state, toaster, ClinicProduct, clinic, product, products) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicProduct = ClinicProduct;
      this.clinic = clinic;
      this.product = product;
      this.taxTypes = [{name: '外税', value: 'EXCLUSIVE'}, {name: '内税', value: 'INCLUSIVE'}];

      this.courses = Array.from(new Set(products.map((item) => item.course)));
      this.categories = Array.from(new Set(products.map((item) => item.category)));
    }

    // 診察料金を登録する
    save(product) {
      this.ClinicProduct.save({clinicId: this.clinic.id}, product).$promise
        .then(() => {
          this.toaster.info('診察料金を新しく登録しました。');
          this.$state.go('app.dashboard.product');
        });
    }

    // 診察料金を更新する
    update(product) {
      this.ClinicProduct.update({clinicId: this.clinic.id, productId: product.id}, product).$promise
        .then(() => this.ClinicProduct.fetch({clinicId: this.clinic.id}).$promise)
        .then(() => {
          this.toaster.info('診察料金の情報を更新しました。');
          this.$state.go('app.dashboard.product.detail', {productId: product.id});
        });
    }

    transfrom(value) {
      if (value) {
        return value;
      }
      return null;
    }

    create(value) {
      return value;
    }
  }

  ProductFormController.$inject = ['$state', 'toaster', 'ClinicProduct', 'clinic', 'product', 'products'];
  angular.module('petzApp')
    .controller('ProductFormController', ProductFormController);

})();
