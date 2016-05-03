(() => {
  'use strict';

  class ResetController {
    constructor($state, toaster, Password) {
      this.$state = $state;
      this.toaster = toaster;
      this.Password = Password;
    }

    // パスワードをリセットする
    reset(login) {
      this.Password.delete({login: login}).$promise
        .then(() => {
          this.toaster.info('登録されているメールアドレスにメールを送信しました。');
          this.$state.go('app.reset.password');
        });
    }
  }

  ResetController.$inject = ['$state', 'toaster', 'Password'];
  angular.module('petzApp')
    .controller('ResetController', ResetController);

})();
