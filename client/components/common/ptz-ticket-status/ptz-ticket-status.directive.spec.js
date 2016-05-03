'use strict';

describe('Directive: ptzTicketStatus', function () {

  // load the directive's module and view
  beforeEach(module('petzApp'));
  beforeEach(module('components/directives/ptz-ticket-status/ptz-ticket-status.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ptz-ticket-status></ptz-ticket-status>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ptzTicketStatus directive');
  }));
});
