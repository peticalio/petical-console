'use strict';

describe('Service: UserPet', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_UserPet_) {
    sut = _UserPet_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
