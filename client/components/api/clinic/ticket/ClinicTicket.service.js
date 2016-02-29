'use strict';

angular.module('petz.api')
  .factory('ClinicTicket', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId', {}, {});
    }
  ]);
