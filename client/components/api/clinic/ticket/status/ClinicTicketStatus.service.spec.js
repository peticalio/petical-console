'use strict';

describe('Service: ClinicTicketStatus', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicTicketStatus_) {
    sut = _ClinicTicketStatus_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
