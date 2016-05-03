'use strict';

angular.module('petz.api')
  .factory('ClinicVaccine', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/vaccines/:vaccineId');
    }
  ]);
