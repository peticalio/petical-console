'use strict';

describe('Service: ClinicCharge', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicCharge_) {
    sut = _ClinicCharge_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
