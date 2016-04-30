(() => {
  'use strict';

  class ResetFinishController {
    constructor($state) {
      this.$state = $state;
    }
  }

  ResetFinishController.$inject = ['$state'];
  angular.module('petzApp')
    .controller('ResetFinishController', ResetFinishController);

})();
