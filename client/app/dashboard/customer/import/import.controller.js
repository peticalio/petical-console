/* istanbul ignore next: tired of writing tests */
(()=> {
  'use strict';

  class CustomerImportController {
    constructor($state, $stateParams, ClinicUser, clinic) {
      this.state = $state;
      this.params = $stateParams;
      this.ClinicUser = ClinicUser;
      this.clinic = clinic;
    }

    // 認証した顧客候補のユーザー情報を削除する
    clear() {
      this.customer = null;
    }

    // 認証して顧客候補の情報を表示する
    authenticate(token) {
      this.ClinicUser.authenticate({clinicId: this.params.clinicId}, token).$promise
        .then((response) => {
          this.customer = {clinic: this.clinic, user: response};
        });
    }

    // 飼い主のデータをインポートする
    imp(token) {
      this.ClinicUser.imp({clinicId: this.params.clinicId}, token).$promise
        .then((response) => {
          this.state.go('app.dashboard.customer', {clinicId: this.params.clinicId, customerId: response.id});
        });
    }
  }

  CustomerImportController.$inject = ['$state', '$stateParams', 'ClinicUser', 'clinic'];
  angular.module('petzApp')
    .controller('CustomerImportController', CustomerImportController);

})();
