'use strict';

describe('Service: ClinicVaccine', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicVaccine_) {
    sut = _ClinicVaccine_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
