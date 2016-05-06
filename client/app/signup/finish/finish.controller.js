(() => {
  'use strict';

  class SignupFinishController {
    constructor($state, $cacheFactory, toaster, Auth, Activate) {
      this.$state = $state;
      this.$cacheFactory = $cacheFactory;
      this.toaster = toaster;
      this.Auth = Auth;
      this.Activate = Activate;
    }

    activate(key) {
      this.Activate.get({key:key}).$promise
        .then((response) => {
          this.Auth.replaceUser(response);
        })
        .then(() => {
          this.$cacheFactory.get('$http').removeAll();
          this.$state.go('app.main');
        })
        .catch((cause) => {
          if (cause.status === 404) {
            this.toaster.error('アクティベーションキーに誤りがあります。再入力してください。');
          }
        });
    }
  }

  SignupFinishController.$inject = ['$state', '$cacheFactory', 'toaster', 'Auth', 'Activate'];
  angular.module('petzApp')
    .controller('SignupFinishController', SignupFinishController);

})();
