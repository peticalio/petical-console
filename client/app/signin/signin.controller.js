(()=> {
  'use strict';

  class SigninController {
    constructor($rootScope, $state, $location, $cacheFactory, toaster, Auth) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$location = $location;
      this.$cacheFactory = $cacheFactory;
      this.toaster = toaster;
      this.Auth = Auth;
    }

    // ログインする
    login(form) {
      this.Auth.login(form)
        .then(() => {
          if (this.$rootScope.returnToState) {
            var path = this.root.returnToState + this.root.returnToStateParams;
            this.$location.path(path);
          } else {
            this.$cacheFactory.get('$http').removeAll();
            this.$state.go('app.main', {}, {reload:true});
          }
        })
        .catch(() => {
          this.toaster.error('ログインIDかパスワードが間違っています。');
          this.login.email = null;
          this.login.password = null;
        });
    }
  }

  SigninController.$inject = ['$rootScope', '$state', '$location', '$cacheFactory', 'toaster', 'Auth'];
  angular.module('petzApp')
    .controller('SigninController', SigninController);

})();
