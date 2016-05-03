'use strict';

describe('Service: ClinicTicketExamination', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicTicketExamination_) {
    sut = _ClinicTicketExamination_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
