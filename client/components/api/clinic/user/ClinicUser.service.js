'use strict';

angular.module('petz.api')
  .factory('ClinicUser', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/users/:action', {}, {
        authenticate: {method: 'POST', cache: false, params: {action:'authenticate'}},
        imp: {method: 'POST', cache: false, params: {action:'import'}}
  	  });
    }
  ]);
