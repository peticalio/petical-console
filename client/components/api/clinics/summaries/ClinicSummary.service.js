'use strict';

angular.module('petz.api')
  .factory('ClinicSummary', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/summaries/:category/:type', {}, {});
    }
  ]);
