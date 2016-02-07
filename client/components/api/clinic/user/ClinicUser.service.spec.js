'use strict';

describe('Service: ClinicUser', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicUser_) {
    sut = _ClinicUser_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
