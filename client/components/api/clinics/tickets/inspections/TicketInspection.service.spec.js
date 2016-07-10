'use strict';

describe('Service: TicketInspection', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_TicketInspection_) {
    sut = _TicketInspection_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
