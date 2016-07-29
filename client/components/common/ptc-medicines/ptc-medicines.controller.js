(() => {
  'use strict';

  class PtcMedicinesController {
    constructor() {
    }
  }

  angular.module('petzApp.util')
    .component('ptcMedicines', {
      templateUrl: 'components/common/ptc-medicines/ptc-medicines.html',
      controller:  PtcMedicinesController,
      bindings: {
        form:        '=',
        name:        '@',
        model:       '=', // ng-model
        data:        '<', // data
        required:    '@'  // ng-required
      }
    });
})();
