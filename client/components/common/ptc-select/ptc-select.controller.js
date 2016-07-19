(() => {
  'use strict';

  class PtcSelectController {
    constructor() {
      this.label = '項目名';
      this.data = [];
      this.maxlength = 250;
      this.pattern = '';
      this.message = '一覧から選択するか値を入力してください。';
      this.required = false;
    }

    getLabel(object) {
      if (object.hasOwnProperty('label')) {
        return object.label;
      }
      if (object.hasOwnProperty('name')) {
        return object.name;
      }
      return object;
    }

    getValue(object) {
      if (object.hasOwnProperty('value')) {
        return object.value;
      }
      if (object.hasOwnProperty('id')) {
        return object.id;
      }
      return object;
    }
  }

  angular.module('petzApp.util')
    .component('ptcSelect', {
      templateUrl: 'components/common/ptc-select/ptc-select.html',
      controller:  PtcSelectController,
      bindings: {
        form:        '=',
        name:        '@',
        label:       '@', // label
        model:       '=', // ng-model
        data:        '<', // data
        maxlength:   '@', // ng-maxlength
        message:     '@', // placeholder & error message
        required:    '@', // ng-required
        onTransform: '&', // transform list object value
        onCreate:    '&'  // create new object
      }
    });
})();
