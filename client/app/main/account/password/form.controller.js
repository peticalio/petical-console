(()=> {
  'use strict';

  class AccountPasswordFormController {
    constructor($state, toaster, MyPassword) {
      this.$state = $state;
      this.toaster = toaster;
      this.MyPassword = MyPassword;
    }

    update(password) {
      this.MyPassword.update(password).$promise
        .then(() => {
          this.toaster.info('パスワードを変更しました。');
          this.$state.go('app.main');
        });
    }
  }

  AccountPasswordFormController.$inject = ['$state', 'toaster', 'MyPassword'];
  angular.module('petzApp')
    .controller('AccountPasswordFormController', AccountPasswordFormController);

})();
