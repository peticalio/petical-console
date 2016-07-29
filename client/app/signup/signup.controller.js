(() => {
  'use strict';

  class SignupController {
    // コンストラクタ
    constructor($state, Signup) {
      this.$state = $state;
      this.Signup = Signup;
    }

    // サインアップする
    signup(user) {
      this.Signup.save({action:'signup'}, user).$promise
        .then(() => this.$state.go('app.signup.thanks'));
    }
  }

  SignupController.$inject = ['$state', 'Signup'];
  angular.module('petzApp')
    .controller('SignupController', SignupController);

})();
