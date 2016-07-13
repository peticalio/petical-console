(() => {
  'use strict';

  class PtcTicketController {
    constructor() {
    }
  }

  angular.module('petzApp.util')
    .component('ptcTicket', {
      templateUrl: 'components/common/ptc-ticket/ptc-ticket.html',
      controller:  PtcTicketController,
      bindings: {
        ticket:      '<',
        params:      '<'
      }
    });

})();
