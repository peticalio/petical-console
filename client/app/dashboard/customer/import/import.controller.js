(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('CustomerImportController', CustomerImportController);

  CustomerImportController.$inject = ['$state', '$stateParams', 'ClinicUser', 'clinic'];
  function CustomerImportController($state, $stateParams, ClinicUser, clinic) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      // variables
      _this.clinic = clinic;

      // methods
      _this.clear = clear;
      _this.authenticate = authenticate;
      _this.imp = imp;
    }

    // 認証した顧客候補のユーザー情報を削除する
    function clear() {
      _this.customer = null;
    }

    // 認証して顧客候補の情報を表示する
    function authenticate(token) {
      ClinicUser.authenticate({clinicId:$stateParams.clinicId}, token).$promise
        .then(function(response) {
          _this.customer = {clinic:_this.clinic, user:response};
        });
    }

    function imp(token) {
      ClinicUser.imp({clinicId:$stateParams.clinicId}, token).$promise
        .then(function(response) {
          $state.go('app.dashboard.customer.list.detail', {clinicId:$stateParams.clinicId, customerId:response.id});
        });
    }

    constructor();
  }
})();
