'use strict';

describe('Service: ClinicCustomer', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicCustomer_) {
    sut = _ClinicCustomer_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
