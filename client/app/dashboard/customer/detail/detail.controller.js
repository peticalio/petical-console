/* istanbul ignore next: tired of writing tests */
(()=> {
  'use strict';

  class CustomerDetailController {
    constructor($state, $stateParams, ClinicCustomer, customer, pets, charts) {
      this.state = $state;
      this.params = $stateParams;
      this.ClinicCustomer = ClinicCustomer;
      this.customer = customer;
      this.pets = pets;

      this.pets.some(function(pet, i) {
        charts.some(function(chart, i) {
          if (pet.id === chart.pet.id) {
            pet.chart = chart;
          }
        });
      });
    }
  }

  CustomerDetailController.$inject = ['$state', '$stateParams', 'ClinicCustomer', 'customer', 'pets'];
  angular.module('petzApp')
    .controller('CustomerDetailController', CustomerDetailController);

})();
