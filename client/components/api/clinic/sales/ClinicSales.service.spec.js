'use strict';

describe('Service: ClinicSales', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicSales_) {
    sut = _ClinicSales_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
