'use strict';

describe('Service: dialog', function () {

  // load the service's module
  beforeEach(module('petz.vendor'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_dialog_) {
    sut = _dialog_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
