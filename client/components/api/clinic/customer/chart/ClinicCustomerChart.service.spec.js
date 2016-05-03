'use strict';

describe('Service: ClinicCustomerChart', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicCustomerChart_) {
    sut = _ClinicCustomerChart_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
