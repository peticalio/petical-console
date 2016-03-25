'use strict';

angular.module('petz.api')
  .factory('ClinicTicketExamination', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/examinations/:examinationId', {}, {});
    }
  ]);
