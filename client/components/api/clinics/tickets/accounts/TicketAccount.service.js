'use strict';

angular.module('petz.api')
  .factory('TicketAccount', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/accounts', {}, {});
    }
  ]);
