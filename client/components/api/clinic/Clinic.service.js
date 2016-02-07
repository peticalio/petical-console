'use strict';

angular.module('petz.api')
  .factory('Clinic', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId', {clinicId:'@id'}, {});
    }
  ]);
