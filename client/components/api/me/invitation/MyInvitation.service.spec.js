'use strict';

describe('Service: MyInvitation', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_MyInvitation_) {
    sut = _MyInvitation_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
