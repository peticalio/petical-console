'use strict';

describe('Service: Diagnosis', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Diagnosis_) {
    sut = _Diagnosis_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
