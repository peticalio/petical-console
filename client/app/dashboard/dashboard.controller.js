(() => {
  'use strict';

  class DashboardController {
    constructor($stateParams, ClinicOutline, ClinicTicketSummary, ClinicSales, clinics, clinic) {
      this.$stateParams = $stateParams;
      this.ClinicOutline = ClinicOutline;
      this.ClinicTicketSummary = ClinicTicketSummary;
      this.ClinicSales = ClinicSales;
      this.clinic = clinic;
      this.clinics = clinics;
      this.today = new Date();
      this.loadTicketSummary();
      this.loadDailySales();
      this.loadMonthlySales();
    }

    getClinicOutline() {
      return this.ClinicOutline.get({clinicId: this.$stateParams.clinicId, year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()}).$promise
        // .then((response) => response.$promise);
        .then((response) => {
          this.outline = response;
          return response.$promise;
        });
    }

    loadTicketSummary() {
      console.log('call');
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
