'use strict';

angular.module('petz.api')
  .factory('ClinicCustomerPet', ['resource', function (resource) {
    return resource('/api/v1/clinics/:clinicId/customers/:customerId/pets', {}, {});
  }]);
