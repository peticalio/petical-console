'use strict';

describe('Controller: CustomerImportController', function () {

  // load the controller's module
  beforeEach(module('petzApp'));

  var sut, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    sut = $controller('CustomerImportController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
