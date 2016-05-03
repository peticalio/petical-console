'use strict';

describe('Directive: ptzStateLoadingIndicator', function () {

  // load the directive's module
  beforeEach(module('petz.core'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ptz-state-loading-indicator></ptz-state-loading-indicator>');
    element = $compile(element)(scope);
  }));
});
