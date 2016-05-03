'use strict';

describe('Service: ClinicTicketCertificate', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicTicketCertificate_) {
    sut = _ClinicTicketCertificate_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
