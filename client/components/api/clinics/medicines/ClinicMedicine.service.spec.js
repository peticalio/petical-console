'use strict';

describe('Service: ClinicMedicine', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicMedicine_) {
    sut = _ClinicMedicine_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
