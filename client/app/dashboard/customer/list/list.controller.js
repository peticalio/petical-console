(()=> {
  'use strict';

  class CustomerListController {
    constructor($state, $stateParams, toaster, ClinicCustomer, customers) {
      this.state = $state;
      this.params = $stateParams;
      this.toaster = toaster;
      this.ClinicCustomer = ClinicCustomer;
      this.customers = customers;
      this.isOpen = false;
    }

    // 一覧を更新する
    refresh() {
      this.ClinicCustomer.fetch({clinicId: this.params.clinicId}).$promise
        .then((response) => {
          this.toaster.info('飼い主さまの一覧を更新しました。');
          this.customers = response;
        });
    }
  }

  CustomerListController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicCustomer', 'customers'];
  angular.module('petzApp')
    .controller('CustomerListController', CustomerListController);

})();
