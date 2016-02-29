'use strict';

describe('Service: ClinicTicketInvoice', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicTicketInvoice_) {
    sut = _ClinicTicketInvoice_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
