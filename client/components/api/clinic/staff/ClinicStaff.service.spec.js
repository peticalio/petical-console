'use strict';

describe('Service: ClinicStaff', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicStaff_) {
    sut = _ClinicStaff_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
