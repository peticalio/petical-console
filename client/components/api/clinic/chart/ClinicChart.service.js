'use strict';

angular.module('petz.api')
  .factory('ClinicChart', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/charts/:chartId', {clinicId:'@clinicId', chartId:'@id'}, {});
    }
  ]);
