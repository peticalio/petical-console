'use strict';

describe('Service: ClinicCustomerPet', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicCustomerPet_) {
    sut = _ClinicCustomerPet_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
