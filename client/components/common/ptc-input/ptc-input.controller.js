(() => {
  'use strict';

  class PtcInputController {
    constructor() {
      this.datePickerOptions = {
        // dateDisabled: 'disabled',
        formatYear: 'yy',
        // maxDate: new Date(),
        // minDate: new Date(1900, 1, 1),
        startingDay: 1
      };
    }
  }

  angular.module('petzApp.util')
    .component('ptcInput', {
      templateUrl: 'components/common/ptc-input/ptc-input.html',
      controller:  PtcInputController,
      bindings: {
        hint:        '@',
        form:        '=',
        name:        '@',
        type:        '@',
        label:       '@', // label
        model:       '=', // ng-model
        minlength:   '@', // ng-minlength
        maxlength:   '@', // ng-maxlength
        min:         '@', // ng-min
        max:         '@', // ng-max
        pattern:     '@', // ng-pattern
        message:     '@', // placeholder & error message
        required:    '<', // ng-required
        disabled:    '<', // ng-disabled
        onblur:      '&', // ng-blur
        onclick:     '&'  // ng-click
      }
    });

})();
