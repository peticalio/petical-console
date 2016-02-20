(()=> {
  'use strict';

  class SigninController {
    constructor($rootScope, $state, $location, $cacheFactory, Auth) {
      this.root = $rootScope;
      this.state = $state;
      this.location = $location;
      this.cache = $cacheFactory;
      this.Auth = Auth;
    }

    // ログインする
    login(form) {
      this.Auth.login(form)
        .then(() => {
          if (this.root.returnToState) {
            var path = this.root.returnToState + this.root.returnToStateParams;
            this.location.path(path);
          } else {
            this.cache.get('$http').removeAll();
            this.state.go('app.home', {}, {reload: true});
          }
        });
    }
  }

  SigninController.$inject = ['$rootScope', '$state', '$location', '$cacheFactory', 'Auth'];
  angular.module('petzApp')
    .controller('SigninController', SigninController);

})();
