(() => {
  'use strict';

  class SignupController {
    constructor($rootScope, $state, $location, $cacheFactory, api, vcRecaptchaService, Auth, Signup) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$location = $location;
      this.$cacheFactory = $cacheFactory;
      this.api = api;
      this.vcRecaptchaService = vcRecaptchaService;
      this.Auth = Auth;
      this.Signup = Signup;
    }

    // サインアップする
    signup(user) {
      this.Signup.save({captcha:this.response}, {email: user.email, password: user.password, firstName: user.firstName, lastName: user.lastName}).$promise
        .then(() => this.Auth.login(user))
        .then(() => {
          if (this.$rootScope.returnToState) {
            var path = this.$rootScope.returnToState + this.$rootScope.returnToStateParams;
            this.$location.path(path);
          } else {
            this.$state.go('app.activate', {}, {reload: true});
          }
        });
    }

    success(response) {
      this.response = response;
    }

    setWidgetId(id) {
      this.widgetId = id;
    }

    expired() {
      this.vcRecaptchaService.reload(this.widgetId);
    }
  }

  SignupController.$inject = ['$rootScope', '$state', '$location', '$cacheFactory', 'api', 'vcRecaptchaService', 'Auth', 'Signup'];
  angular.module('petzApp')
    .controller('SignupController', SignupController);

})();
