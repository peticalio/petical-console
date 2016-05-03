'use strict';

angular.module('petz.api')
  .factory('ClinicStaff', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/staffs/:staffId');
    }
  ]);
