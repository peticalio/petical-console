'use strict';

describe('Service: Kind', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Kind_) {
    sut = _Kind_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
