'use strict';

angular.module('petz.api')
  .factory('Activate', ['resource', function (resource) {
    return resource('/api/v1/activate', {}, {});
  }]);
