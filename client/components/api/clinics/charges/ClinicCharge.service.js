'use strict';

angular.module('petz.api')
  .factory('ClinicCharge', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/charges/:chargeId');
    }
  ]);
