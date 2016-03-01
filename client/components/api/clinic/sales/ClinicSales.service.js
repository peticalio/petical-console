'use strict';

angular.module('petz.api')
  .factory('ClinicSales', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/sales/:type');
    }
  ]);
