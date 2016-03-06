'use strict';

angular.module('petz.api')
  .factory('ClinicProduct', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/products/:productId');
    }
  ]);
