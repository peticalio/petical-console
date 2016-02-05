'use strict';

describe('Service: Auth', function () {

  // load the service's module
  beforeEach(module('petzApp'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Auth_) {
    sut = _Auth_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
