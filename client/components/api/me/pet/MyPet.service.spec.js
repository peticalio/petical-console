'use strict';

describe('Service: MyPet', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_MyPet_) {
    sut = _MyPet_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
