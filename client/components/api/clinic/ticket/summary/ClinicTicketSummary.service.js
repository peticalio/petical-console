'use strict';

angular.module('petz.api')
  .factory('ClinicTicketSummary', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/summary/:type');
    }
  ]);
