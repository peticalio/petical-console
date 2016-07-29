'use strict';

describe('Service: ClinicSummary', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_ClinicSummary_) {
    sut = _ClinicSummary_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
