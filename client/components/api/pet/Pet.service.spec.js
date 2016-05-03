'use strict';

describe('Service: Pet', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Pet_) {
    sut = _Pet_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
