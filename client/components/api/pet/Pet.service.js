'use strict';

angular.module('petz.api')
  .factory('Pet', ['resource',
    function (resource) {
      return resource('/api/v1/pets/:petId', {petId:'@id'}, {});
    }
  ]);
