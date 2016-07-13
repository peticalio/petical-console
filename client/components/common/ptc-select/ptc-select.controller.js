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

    doTransform(v) {
      return this.onTransform({value: v});
    }

    doCreate(v) {
      return this.onCreate({value: v});
    }

    refresh($select) {
      var search = $select.search;
      var list = angular.copy($select.items);
      var FLAG = null;

      list = list.filter((item) => {
        var value = this.doTransform(item);
        return value !== FLAG; // 本当はIDで見るべきだが、重複入力は許容しない前提です
      });

      if (!search) {
        $select.items = list;
        this.invalid = this.required;
      } else {
        var item = this.doCreate(search);
        if (this.validate(item)) {
          $select.items = [item].concat(list);
          $select.selected = item;
          this.invalid = false;
        } else {
          this.invalid = true;
        }
      }
    }

    validate(item) {
      var value = this.doTransform(item);
      if (this.required && !value) {
        return false;
      }
      return true;
    }

    select() {
      this.invalid = false;
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
