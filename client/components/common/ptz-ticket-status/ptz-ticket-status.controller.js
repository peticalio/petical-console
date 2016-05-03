(() => {
  'use strict';

  class PtzTicketStatusController {
  }

  angular.module('petzApp')
    .component('ptzTicketStatus', {
      templateUrl: 'components/common/ptz-ticket-status/ptz-ticket-status.html',
      controller:  PtzTicketStatusController,
      bindings: {
        value: '<'
      }
    });

})();
