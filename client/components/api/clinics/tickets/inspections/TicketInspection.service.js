'use strict';

angular.module('petz.api')
  .factory('TicketInspection', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/inspections/:inspectionId', {}, {});
    }
  ]);
