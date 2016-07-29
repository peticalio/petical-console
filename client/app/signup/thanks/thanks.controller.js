(() => {
  'use strict';

  class SignupThanksController {
    // コンストラクタ
    constructor($state) {
      this.$state = $state;
    }
  }

  SignupThanksController.$inject = ['$state'];
  angular.module('petzApp')
    .controller('SignupThanksController', SignupThanksController);

})();
