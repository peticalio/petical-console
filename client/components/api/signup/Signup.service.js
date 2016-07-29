'use strict';

angular.module('petz.api')
  .factory('Signup', ['resource', function (resource) {
    return resource('/api/v1/:action', {});
  }]);
