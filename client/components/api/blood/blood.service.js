'use strict';

angular.module('petz.api')
  .factory('Blood', ['resource',
    function (resource) {
      return resource('/api/v1/bloods', {}, {});
    }
  ]);
