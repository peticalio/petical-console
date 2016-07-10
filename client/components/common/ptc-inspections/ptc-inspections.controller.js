(() => {
  'use strict';

  class PtcInspectionsController {
    constructor() {
    }
  }

  angular.module('petzApp.util')
    .component('ptcInspections', {
      templateUrl: 'components/common/ptc-inspections/ptc-inspections.html',
      controller:  PtcInspectionsController,
      bindings: {
        form:        '=',
        name:        '@',
        model:       '=', // ng-model
        data:        '<', // data
        required:    '@'  // ng-required
      }
    });
})();
