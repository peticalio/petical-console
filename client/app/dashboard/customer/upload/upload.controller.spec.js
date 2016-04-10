'use strict';

describe('Controller: CustomerUploadController', function () {

  // load the controller's module
  beforeEach(module('petzApp'));

  var sut, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    sut = $controller('CustomerUploadController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
