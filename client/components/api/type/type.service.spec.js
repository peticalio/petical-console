'use strict';

describe('Service: Type', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Type_) {
    sut = _Type_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
