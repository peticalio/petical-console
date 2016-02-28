'use strict';

angular.module('petz.api')
  .factory('Color', ['resource',
    function (resource) {
      return resource('/api/v1/colors', {}, {});
    }
  ]);
