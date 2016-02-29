'use strict';

angular.module('petz.api')
  .factory('ClinicTicketAttachment', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/attachments/:attachmentId', {}, {});
    }
  ]);
