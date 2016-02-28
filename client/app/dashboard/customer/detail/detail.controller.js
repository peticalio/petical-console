(() => {
  'use strict';

  class CustomerDetailController {
    constructor($state, $stateParams, dialog, toaster, ClinicCustomer, UserPet, ClinicCustomerChart, clinic, customer, pets, charts) {
      this.state = $state;
      this.params = $stateParams;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicCustomer = ClinicCustomer;
      this.clinic = clinic;
      this.customer = customer;
      this.pets = pets;
      this.charts = charts;
      this.relate();
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
          this.state.go('app.dashboard.customer.list');
        });
    }

    refresh() {
      this.UserPet.query({userId: this.customer.user.id}).$promise
        .then((response) => {
          this.pets = response;
        });
      this.ClinicCustomerChart.query({clinicId:$stateParams.clinicId, customerId:$stateParams.customerId}).$promise
        .then((response) => {
          this.charts = response;
        });
      this.relate();
    }

    relate() {
      this.pets.some((pet) => {
        this.charts.some((chart) => {
          if (pet.id === chart.pet.id) {
            pet.chart = chart;
          }
        });
      });
    }
  }

  CustomerDetailController.$inject = ['$state', '$stateParams', 'dialog', 'toaster', 'ClinicCustomer', 'UserPet', 'ClinicCustomerChart', 'clinic', 'customer', 'pets', 'charts'];
  angular.module('petzApp')
    .controller('CustomerDetailController', CustomerDetailController);

})();
