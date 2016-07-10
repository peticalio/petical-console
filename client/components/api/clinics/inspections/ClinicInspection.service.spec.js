'use strict';

describe('Service: ClinicInspection', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicInspection_) {
    sut = _ClinicInspection_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
