'use strict';

angular.module('petz.api')
  .factory('ClinicOutline', ['resource', function (resource) {
    return resource('/api/v1/clinics/:clinicId/outline', {}, {});
  }]);
