'use strict';

describe('Service: MyPassword', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_MyPassword_) {
    sut = _MyPassword_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
