'use strict';

angular.module('petz.api')
  .factory('MyClinic', ['resource',
    function (resource) {
      return resource('/api/v1/me/clinics', {}, {});
    }
  ]);
