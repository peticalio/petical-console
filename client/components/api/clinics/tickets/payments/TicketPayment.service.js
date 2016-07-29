'use strict';

angular.module('petz.api')
  .factory('TicketPayment', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/payments', {}, {});
    }
  ]);
