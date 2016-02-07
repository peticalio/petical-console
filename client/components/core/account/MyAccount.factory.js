'use strict';

angular.module('petz.core')
  .factory('MyAccount', ['resource',
    function (resource) {
      return resource('/api/v1/me');
    }
  ]);
