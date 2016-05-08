'use strict';

describe('Service: Activate', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Activate_) {
    sut = _Activate_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
