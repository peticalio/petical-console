(() => {
  'use strict';

  class ValidatorFactory {
    constructor() {
    }

    createRequiredNameValidator() {
      return function(value, callback) {
        var len = (value + '').length;
        callback(len > 0 && len <= 50);
      };
    }
    createNameValidator() {
      return function(value, callback) {
        callback((value + '').length <= 50);
      };
    }

    createRequiredZipCodeValidator() {
      return function(value, callback) {
        callback((value + '').length === 7 && (/^[0-9]+$/).test(value));
      };
    }

    createRequiredPhoneNoValidator() {
      return function(value, callback) {
        callback((value + '').length > 0 && (value + '').length <= 15 && ((value + '').length === 0 || (/^[0-9]+[-]+[0-9]+[-]+[0-9]+$/).test(value)));
      };
    }

    createPhoneNoValidator() {
      return function(value, callback) {
        callback((value + '').length <= 15 && ((value + '').length === 0 || (/^[0-9]+[-]+[0-9]+[-]+[0-9]+$/).test(value)));
      };
    }

    createEmailValidator() {
      return function(value, callback) {
        callback((value + '').length <= 100);
      };
    }
  }

  ValidatorFactory.$inject = [];
  angular.module('petzApp.util')
    .service('ValidatorFactory', ValidatorFactory);

})();
