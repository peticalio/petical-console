'use strict';

(function() {

class CustomerController {
  constructor($state, $stateParams, customers) {
    this.customers = customers;
    this.selected = [];
  }
}

angular.module('petzApp')
  .controller('CustomerController', CustomerController);

})();
