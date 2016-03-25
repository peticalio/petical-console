'use strict';

angular.module('petz.api')
  .factory('UserPet', ['resource', function (resource) {
    return resource('/api/v1/users/:userId/pets/:petId', {}, {});
  }]);
