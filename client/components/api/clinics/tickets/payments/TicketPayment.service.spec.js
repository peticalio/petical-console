'use strict';

describe('Service: TicketPayment', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_TicketPayment_) {
    sut = _TicketPayment_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
