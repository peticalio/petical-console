'use strict';

angular.module('petz.api')
  .factory('ClinicChartTicket', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/charts/:chartId/tickets/:ticketId', {}, {});
    }
  ]);
