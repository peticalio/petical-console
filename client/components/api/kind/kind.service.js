'use strict';

angular.module('petz.api')
  .factory('Kind', ['resource',
    function (resource) {
      return resource('/api/v1/kinds', {}, {});
    }
  ]);
