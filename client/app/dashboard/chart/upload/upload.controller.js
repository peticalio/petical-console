(() => {
  'use strict';

  class ChartUploadController {
    construct($state, $stateParams) {
      this.$state = $state;
      this.$stateParams = $stateParams;
    }
  }

  ChartUploadController.$inject = ['$state', '$stateParams'];
  angular.module('petzApp')
    .controller('ChartUploadController', ChartUploadController);
})();
