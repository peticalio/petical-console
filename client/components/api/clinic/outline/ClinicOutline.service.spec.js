'use strict';

describe('Service: ClinicOutline', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicOutline_) {
    sut = _ClinicOutline_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
