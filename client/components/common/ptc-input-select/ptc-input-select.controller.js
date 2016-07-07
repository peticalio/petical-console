(() => {
  'use strict';

  class PtcInputSelectController {
    constructor() {
      this.label = '項目名';
      this.data = [];
      this.minlength = 0;
      this.maxlength = 250;
      this.pattern = '';
      this.message = '一覧から選択するか値を入力してください。';
      this.required = false;
    }
  }

  angular.module('petzApp.util')
    .component('ptcInputSelect', {
      templateUrl: 'components/common/ptc-input-select/ptc-input-select.html',
      controller:  PtcInputSelectController,
      bindings: {
        form:        '=',
        name:        '@',
        label:       '@', // label
        model:       '=', // ng-model
        data:        '<', // data
        minlength:   '@', // ng-minlength
        maxlength:   '@', // ng-maxlength
        message:     '@', // placeholder & error message
        required:    '@'  // ng-required
      }
    });
})();
