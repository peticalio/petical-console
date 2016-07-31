(() => {
  'use strict';

  class PtcTextareaController {
    constructor() {
    }
  }

  angular.module('petzApp.util')
    .component('ptcTextarea', {
      templateUrl: 'components/common/ptc-textarea/ptc-textarea.html',
      controller:  PtcTextareaController,
      bindings: {
        form:        '=',
        name:        '@',
        label:       '@', // label
        model:       '=', // ng-model
        minlength:   '@', // ng-minlength
        maxlength:   '@', // ng-maxlength
        pattern:     '@', // ng-pattern
        message:     '@', // placeholder & error message
        required:    '<'  // ng-required
      }
    });

})();
