'use strict';

describe('Service: MyAccount', function () {

  // load the service's module
  beforeEach(module('petzApp'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_MyAccount_) {
    sut = _MyAccount_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
