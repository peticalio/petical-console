'use strict';

describe('Service: Password', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Password_) {
    sut = _Password_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
