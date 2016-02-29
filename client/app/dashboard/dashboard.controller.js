(() => {
  'use strict';

  class DashboardController {
    construct($stateParams, ClinicOutline, ClinicTicketSummary, ClinicSales, clinics, clinic) {
      this.$stateParams = $stateParams;
      this.clinic = clinic;
      this.clinics = clinics;
      this.today = new Date();
    }

    getClinicOutline() {
      return this.ClinicOutline.get({clinicId: this.$stateParams.clinicId, year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()}).$promise
        .then((response) => response.$promise);
        // .then((response) => {
        //   this.outline = response;
        //   return response.$promise;
        // });
    }

    loadTicketSummary() {
      this.ClinicTicketSummary.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          response.data.unshift(response.labels);
          this.ticketChart = {
            options: {
              colors: ['#2196F3']
            },
            type: 'ColumnChart',
            data: response.data
          };
        });
    }

    loadDailySales() {
      this.ClinicSales.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          response.data.unshift(response.labels);
          this.dailySalesChart = {
            options: {
              colors: ['#8BC34A']
            },
            type: 'ColumnChart',
            data: response.data
          };
        });
    }

    loadMonthlySales() {
      this.ClinicSales.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          response.data.unshift(response.labels);
          this.monthlySalesChart = {
            options: {
              colors: ['#00BCD4']
            },
            type: 'ColumnChart',
            data: response.data
          };
        });
    }
  }

  DashboardController.$inject = ['$stateParams', 'ClinicOutline', 'ClinicTicketSummary', 'ClinicSales', 'clinics', 'clinic'];
  angular.module('petzApp')
    .controller('DashboardController', DashboardController);

})();
