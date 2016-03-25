'use strict';

describe('Service: ClinicInvoice', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicInvoice_) {
    sut = _ClinicInvoice_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
