(() => {
  'use strict';

  class PtcTextareaController {
    constructor() {
      this.label = '項目名';
      this.required = false;
      this.minlength = 0;
      this.maxlength = 2000;
      this.pattern = '';
      this.message = '値を入力してください。';
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
