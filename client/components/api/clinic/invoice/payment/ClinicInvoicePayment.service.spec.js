'use strict';

describe('Service: ClinicInvoicePayment', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicInvoicePayment_) {
    sut = _ClinicInvoicePayment_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
