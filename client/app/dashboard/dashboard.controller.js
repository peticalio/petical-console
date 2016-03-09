(() => {
  'use strict';

  class DashboardController {
    constructor($stateParams, $filter, ClinicOutline, ClinicTicketSummary, ClinicSales, clinics, clinic) {
      this.$stateParams = $stateParams;
      this.$filter = $filter;
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
      var formateDate = function(d) {
        var date = new Date(d);
        return date.getHours() + ':' + date.getMinutes();
      };

      this.ClinicTicketSummary.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          // response.data.unshift(response.labels);
          this.ticketChartOptions = {
            chart: {
              type: 'historicalBarChart',
              height: 300,
              margin : {top: 16, right: 0, bottom: 40, left: 40},
              x: function(d) {return d[0] * 1000;},
              y: function(d) {return d[1];},
              showControls: true,
              showValues: true,
              xAxis: {
                axisLabel: 'Time',
                tickFormat: formateDate
              },
              tooltip: {
                keyFormatter: formateDate
              }
            }
          };
          this.ticketChartData = [{
            key: 'Quantity',
            values: response.data
          }];

          // this.ticketChart = {
          //   options: {
          //     colors: ['#2196F3']
          //   },
          //   type: 'ColumnChart',
          //   data: response.data
          // };
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

  DashboardController.$inject = ['$stateParams', '$filter', 'ClinicOutline', 'ClinicTicketSummary', 'ClinicSales', 'clinics', 'clinic'];
  angular.module('petzApp')
    .controller('DashboardController', DashboardController);

})();
