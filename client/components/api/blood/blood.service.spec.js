'use strict';

describe('Service: Blood', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Blood_) {
    sut = _Blood_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
