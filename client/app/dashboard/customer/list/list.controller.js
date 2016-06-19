(()=> {
  'use strict';

  class CustomerListController {
    constructor($state, toaster, ClinicCustomer, clinic, customers) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicCustomer = ClinicCustomer;
      this.clinic = clinic;
      this.customers = customers;
      this.page = 1;
      this.limit = 20;
    }

    // 一覧を更新する
    refresh() {
      this.ClinicCustomer.fetch({clinicId: this.clinic.id}).$promise
        .then((response) => {
          this.toaster.info('飼い主さまの一覧を更新しました。');
          this.customers = response;
        });
    }

    // ソートキーを指定する
    sort(key) {
      this.order = key;
      this.reverse = !this.reverse;
    }
  }

  CustomerListController.$inject = ['$state', 'toaster', 'ClinicCustomer', 'clinic', 'customers'];
  angular.module('petzApp')
    .controller('CustomerListController', CustomerListController);

})();
