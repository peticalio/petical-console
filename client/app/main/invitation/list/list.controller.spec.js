'use strict';

describe('Controller: InvitationListController', function () {

  // load the controller's module
  beforeEach(module('petzApp'));

  var sut, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    sut = $controller('InvitationListController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
