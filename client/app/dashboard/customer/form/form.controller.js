(()=> {
  'use strict';

  class CustomerFormController {
    constructor($state, $stateParams, toaster, ClinicCustomer, customer) {
      this.state = $state;
      this.params = $stateParams;
      this.toaster = toaster;
      this.ClinicCustomer = ClinicCustomer;
      this.customer = customer;
      this.useEmailForLoginId = true;
    }

    // メールアドレスをログインIDフィールドにコピーする
    copyEmailToLogin() {
      if (!this.customer.id) {
        this.customer.user.login = this.customer.user.email;
      }
    }

    // 飼い主を新規登録する
    save(customer) {
      this.ClinicCustomer.save({clinicId: this.params.clinicId}, customer).$promise
        .then(() => {
          this.toaster.info('新しい飼い主さまを登録しました。');
          this.state.go('app.dashboard.customer', {clinicId: this.params.clinicId});
        });
    }

    // 飼い主を変更する
    update(customer) {
      this.ClinicCustomer.update({clinicId: this.params.clinicId, customerId: customer.id}, customer).$promise
        .then(() => {
          return this.ClinicCustomer.clear({clinicId: this.params.clinicId}).$promise;
        })
        .then(() => {
          this.toaster.info('飼い主さまの情報を変更しました。');
          this.state.go('app.dashboard.customer.detail', {clinicId: this.params.clinicId, customerId: customer.id});
        });
    }
  }

  CustomerFormController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicCustomer', 'customer'];
  angular.module('petzApp')
    .controller('CustomerFormController', CustomerFormController);

})();
