'use strict';

angular.module('petz.api')
  .factory('ClinicTicketStatus', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/status/:status', {}, {
        signal: {method: 'POST', cache: false}, // @deprecated
        update: {method: 'PUT', cache: false}
      });
    }
  ]);
