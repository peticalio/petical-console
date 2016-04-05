'use strict';

angular.module('petz.api')
  .factory('MyPassword', ['resource',
    function (resource) {
      return resource('/api/v1/me/password');
    }
  ]);
