(() => {
  'use strict';

  class SignupActivateController {
    constructor($state, $location, Auth, Signup) {
      this.$state = $state;
      this.Auth = Auth;
      this.Signup = Signup;
      this.key = $location.search().key;
    }

    // サインアップする
    signup(user) {
      user.activationKey = this.key;
      this.Signup.save({action:'activate'}, user).$promise
        .then((response) => this.Auth.login({email:response.data.login, password:user.password}))
        .then(() => this.$state.go('app.main', {}, {reload:true}));
    }
  }

  SignupActivateController.$inject = ['$state', '$location', 'Auth', 'Signup'];
  angular.module('petzApp')
    .controller('SignupActivateController', SignupActivateController);

})();
