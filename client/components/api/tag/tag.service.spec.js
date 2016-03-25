'use strict';

describe('Service: Tag', function () {

  // load the service's module
  beforeEach(module('petz.api'));

  // instantiate service
  var sut;
  beforeEach(inject(function (_Tag_) {
    sut = _Tag_;
  }));

  it('should do something', function () {
    expect(!!sut).toBe(true);
  });

});
