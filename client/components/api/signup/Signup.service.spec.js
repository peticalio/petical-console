'use strict';

describe('Service: Signup', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Signup_) {
    sut = _Signup_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
