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

    createSexValidator() {
      return function(value, callback) {
        callback((value + '').length > 0 && (value.toUpperCase() === 'MALE' || value.toUpperCase() === 'FEMALE'));
      };
    }

    createFlagValidator() {
      return function(value, callback) {
        callback((value + '').length > 0 && (value === 'true' || value === 'false'));
      };
    }

    createDateValidator() {
      return function(value, callback) {
        callback((value + '').length === 0 || (/\d{4}\/\d{1,2}\/\d{1,2}/).test(value));
      };
    }

    createMemoValidator() {
      return function(value, callback) {
        callback((value + '').length <= 2000);
      };
    }
  }

  ValidatorFactory.$inject = [];
  angular.module('petzApp.util')
    .service('ValidatorFactory', ValidatorFactory);

})();
