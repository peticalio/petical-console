'use strict';

describe('Service: ClinicInvitation', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicInvitation_) {
    sut = _ClinicInvitation_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
