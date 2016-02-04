'use strict';

(function() {

class CustomerController {
  constructor($state, $stateParams, customers) {
    this.customers = customers;
  }
}

angular.module('petzApp')
  .controller('CustomerController', CustomerController);

})();
