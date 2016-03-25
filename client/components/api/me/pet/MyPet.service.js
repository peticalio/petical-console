'use strict';

angular.module('petz.api')
  .factory('MyPet', ['resource',
    function (resource) {
      return resource('/api/v1/me/pets');
    }
  ]);
