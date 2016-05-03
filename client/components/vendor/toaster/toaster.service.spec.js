'use strict';

describe('Service: toaster', function () {

  // load the service's module
  beforeEach(module('petz.vendor'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_toaster_) {
    sut = _toaster_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
