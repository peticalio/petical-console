(()=> {
  'use strict';

  class AccountFormController {
    constructor($state, toaster, MyAccount, Auth) {
      this.$state = $state;
      this.toaster = toaster;
      this.MyAccount = MyAccount;
      this.account = Auth.getCurrentUser();
    }

    save(account) {
      this.MyAccount.update(account).$promise
        .then(() => {
          this.toaster.info('アカウント情報を変更しました。');
        });
    }
  }

  AccountFormController.$inject = ['$state', 'toaster', 'MyAccount', 'Auth'];
  angular.module('petzApp')
    .controller('AccountFormController', AccountFormController);

})();
