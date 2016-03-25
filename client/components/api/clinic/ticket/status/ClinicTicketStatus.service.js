'use strict';

angular.module('petz.api')
  .factory('ClinicTicketStatus', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/statuses', {}, {
        signal: {method: 'POST', cache: false}
      });
    }
  ]);
