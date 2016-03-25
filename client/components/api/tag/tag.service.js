'use strict';

angular.module('petz.api')
  .factory('Tag', ['resource',
    function (resource) {
      return resource('/api/v1/tags', {}, {});
    }
  ]);
