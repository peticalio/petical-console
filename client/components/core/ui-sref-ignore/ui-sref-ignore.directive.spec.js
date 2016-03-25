'use strict';

describe('Directive: uiSrefIgnore', function () {

  // load the directive's module
  beforeEach(module('petz.core'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-sref-ignore></ui-sref-ignore>');
    element = $compile(element)(scope);
  }));
});
