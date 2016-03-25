'use strict';

angular.module('petz.api')
  .factory('ClinicTicketCertificate', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/certificates/:certificateId');
    }
  ]);
