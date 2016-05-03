/* istanbul ignore next: tired of writing tests */
(()=> {
  'use strict';

  class CustomerImportController {
    constructor($state, $stateParams, ClinicUser, ClinicCustomer, clinic) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.ClinicUser = ClinicUser;
      this.ClinicCustomer = ClinicCustomer;
      this.clinic = clinic;
    }

    // 認証した顧客候補のユーザー情報を削除する
    clear() {
      this.customer = null;
    }

    // 認証して顧客候補の情報を表示する
    authenticate(token) {
      this.ClinicUser.authenticate({clinicId: this.$stateParams.clinicId}, token).$promise
        .then((response) => {
          this.customer = {clinic: this.clinic, user: response};
        });
    }

    // 飼い主のデータをインポートする
    imp(token) {
      this.ClinicUser.imp({clinicId: this.$stateParams.clinicId}, token).$promise
        .then(() => this.ClinicCustomer.fetch({clinicId: this.$stateParams.clinicId}).$promise)
        .then(() => this.$state.go('app.dashboard.customer.list', {}, {reload:true}));
    }
  }

  CustomerImportController.$inject = ['$state', '$stateParams', 'ClinicUser', 'ClinicCustomer', 'clinic'];
  angular.module('petzApp')
    .controller('CustomerImportController', CustomerImportController);

})();
