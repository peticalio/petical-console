'use strict';

angular.module('petzApp')
  .factory('MyAccount', ['resource',
    function (resource) {
      return resource('/api/v1/me');
    }
  ]);
