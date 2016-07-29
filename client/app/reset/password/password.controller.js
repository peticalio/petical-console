(() => {
  'use strict';

  class ResetPasswordController {
    constructor($state, toaster, Password) {
      this.$state = $state;
      this.toaster = toaster;
      this.Password = Password;
    }

    // パスワードをリセットする
    save(reset) {
      this.Password.save({}, reset).$promise
        .then(() => {
          this.toaster.success('パスワードを変更しました。');
          this.$state.go('app.reset.finish');
        })
        .catch((error) => {
          if (error.status === 404) {
            this.toaster.error('リセットキーが不正か期限切れです。もう一度リセットキーを発行してください。');
          }
        });
    }
  }

  ResetPasswordController.$inject = ['$state', 'toaster', 'Password'];
  angular.module('petzApp')
    .controller('ResetPasswordController', ResetPasswordController);

})();
