'use strict';

describe('Service: Clinic', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Clinic_) {
    sut = _Clinic_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
