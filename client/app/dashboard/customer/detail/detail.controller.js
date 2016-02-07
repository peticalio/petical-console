/* istanbul ignore next: tired of writing tests */
(()=> {
  'use strict';

  class CustomerDetailController {
    constructor($state, $stateParams, dialog, toaster, ClinicCustomer, clinic, customer, pets, charts) {
      this.state = $state;
      this.params = $stateParams;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicCustomer = ClinicCustomer;
      this.clinic = clinic;
      this.customer = customer;
      this.pets = pets;

      this.pets.some(function(pet) {
        charts.some(function(chart) {
          if (pet.id === chart.pet.id) {
            pet.chart = chart;
          }
        });
      });
    }

    // 飼い主を削除する
    delete(event, customer) {
      this.dialog.delete(event, customer)
        .then(() => {
          return this.ClinicCustomer.delete({clinicId: this.params.clinicId, customerId: this.params.customerId});
        })
        .then(() => {
          this.toaster.info('飼い主さまを削除しました。');
          return this.ClinicCustomer.fetch({clinicId: this.params.clinicId}).$promise;
        })
        .then(() => {
          this.state.go('app.dashboard.customer');
        });
    }
  }

  CustomerDetailController.$inject = ['$state', '$stateParams', 'dialog', 'toaster', 'ClinicCustomer', 'clinic', 'customer', 'pets'];
  angular.module('petzApp')
    .controller('CustomerDetailController', CustomerDetailController);

})();
