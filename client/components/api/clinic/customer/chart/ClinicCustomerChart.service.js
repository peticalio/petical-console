'use strict';

angular.module('petz.api')
  .factory('ClinicCustomerChart', ['resource', function (resource) {
    return resource('/api/v1/clinics/:clinicId/customers/:customerId/charts', {}, {});
  }]);
