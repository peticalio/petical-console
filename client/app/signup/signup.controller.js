(()=> {
  'use strict';

  class SignupController {
    constructor($rootScope, $state, $location, $cacheFactory, Auth, Signup) {
      this.root = $rootScope;
      this.state = $state;
      this.location = $location;
      this.cache = $cacheFactory;
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
          if (this.root.returnToState) {
            var path = this.root.returnToState + this.root.returnToStateParams;
            this.location.path(path);
          } else {
            this.cache.get('$http').removeAll();
            this.state.go('app.home');
          }
        });
    };
  }

  SignupController.$inject = ['$rootScope', '$state', '$location', '$cacheFactory', 'Auth', 'Signup'];
  angular.module('petzApp')
    .controller('SignupController', SignupController);

})();
