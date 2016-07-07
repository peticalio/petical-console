(() => {
  'use strict';

  class PtcChargesController {
    constructor() {
    }
  }

  angular.module('petzApp.util')
    .component('ptcCharges', {
      templateUrl: 'components/common/ptc-charges/ptc-charges.html',
      controller:  PtcChargesController,
      bindings: {
        form:        '=',
        name:        '@',
        model:       '=', // ng-model
        data:        '<', // data
        required:    '@'  // ng-required
      }
    });
})();
