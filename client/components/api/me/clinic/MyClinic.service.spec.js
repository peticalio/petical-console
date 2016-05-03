'use strict';

describe('Service: MyClinic', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_MyClinic_) {
    sut = _MyClinic_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
