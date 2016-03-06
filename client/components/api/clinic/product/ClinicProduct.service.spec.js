'use strict';

describe('Service: ClinicProduct', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicProduct_) {
    sut = _ClinicProduct_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
