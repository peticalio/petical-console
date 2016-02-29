'use strict';

describe('Service: ClinicTicketSummary', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicTicketSummary_) {
    sut = _ClinicTicketSummary_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
