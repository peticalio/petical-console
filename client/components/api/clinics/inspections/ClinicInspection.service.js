'use strict';

angular.module('petz.api')
  .factory('ClinicInspection', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/inspections/:inspectionId');
    }
  ]);
