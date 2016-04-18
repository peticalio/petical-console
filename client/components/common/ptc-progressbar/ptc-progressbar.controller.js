(() => {
  'use strict';

  class PtcProgressbarController {
    constructor() {
    }
  }

  angular.module('petzApp')
    .component('ptcProgressbar', {
      templateUrl: 'components/common/ptc-progressbar/ptc-progressbar.html',
      controller:  PtcProgressbarController,
      bindings: {
        value: '<'
      }
    });

})();
