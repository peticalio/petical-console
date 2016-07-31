(() => {
  'use strict';

  class PtcInputSelectController {
    constructor() {
      this.message = '一覧から選択するか新しく入力してください';
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
