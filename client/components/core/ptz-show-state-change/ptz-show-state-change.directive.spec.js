'use strict';

describe('Directive: ptzShowStateChange', function () {

  // load the directive's module
  beforeEach(module('petz.core'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ptz-show-state-change></ptz-show-state-change>');
    element = $compile(element)(scope);
  }));
});
