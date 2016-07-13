'use strict';

angular.module('petz.api')
  .factory('ClinicMedicine', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/medicines/:medicineId', {}, {});
    }
  ]);
