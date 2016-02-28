'use strict';

angular.module('petz.api')
  .factory('Type', ['resource',
    function (resource) {
      return resource('/api/v1/types', {}, {});
    }
  ]);
