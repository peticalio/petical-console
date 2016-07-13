'use strict';

angular.module('petz.api')
  .factory('Diagnosis', ['resource',
    function (resource) {
      return resource('/api/v1/diagnosises/:diagnosisId', {}, {});
    }
  ]);
