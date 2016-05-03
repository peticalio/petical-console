(() => {
  'use strict';

  class SignupController {
    constructor($rootScope, $state, $location, $cacheFactory, Auth, Signup) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$location = $location;
      this.$cacheFactory = $cacheFactory;
      this.Auth = Auth;
      this.Signup = Signup;
    }

    // サインアップする
    signup(user) {
      this.Signup.save({email: user.email, password: user.password, firstName: user.firstName, lastName: user.lastName}).$promise
        .then(() => {
          return this.Auth.login(user);
        })
        .then(() => {
          if (this.$rootScope.returnToState) {
            var path = this.$rootScope.returnToState + this.$rootScope.returnToStateParams;
            this.$location.path(path);
          } else {
            this.$cacheFactory.get('$http').removeAll();
            this.$state.go('app.main', {}, {reload: true});
          }
        });
    }
  }

  SignupController.$inject = ['$rootScope', '$state', '$location', '$cacheFactory', 'Auth', 'Signup'];
  angular.module('petzApp')
    .controller('SignupController', SignupController);

})();
