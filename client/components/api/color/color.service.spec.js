'use strict';

describe('Service: Color', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Color_) {
    sut = _Color_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
