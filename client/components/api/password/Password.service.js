'use strict';

angular.module('petz.api')
  .factory('Password', ['resource',
    function (resource) {
      return resource('/api/v1/password', {}, {});
    }
  ]);
