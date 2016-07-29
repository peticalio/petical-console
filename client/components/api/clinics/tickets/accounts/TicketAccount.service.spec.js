'use strict';

describe('Service: TicketAccount', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_TicketAccount_) {
    sut = _TicketAccount_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
