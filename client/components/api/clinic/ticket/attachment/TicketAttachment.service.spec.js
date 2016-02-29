'use strict';

describe('Service: ClinicTicketAttachment', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicTicketAttachment_) {
    sut = _ClinicTicketAttachment_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
