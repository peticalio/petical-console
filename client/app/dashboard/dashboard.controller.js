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
      var formatTime = function(d) {
        return moment(d).format('HH:mm');
      };
      var transform = function(data, series) {
        return data.map((d) => {
          return {x: d[0], y: d[1], series: series};
        });
      };

      this.ClinicTicketSummary.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          this.ticketChartOptions = {
            chart: {
              type: 'multiBarChart',
              height: 300,
              margin : {top: 16, right: 40, bottom: 40, left: 64},
              clipEdge: true,
              stacked: true,
              xAxis: {
                axisLabel: 'Time (HH:mm)',
                tickFormat: formatTime
              },
              yAxis: {
                axisLabel: 'Count'
              }
            }
          };
          this.ticketChartData = [{
            key: 'Reserved',
            color: '#e91e63',
            values: transform(response.data, 0)
          }, {
            key: 'Complete',
            color: '#2196f3',
            values: transform(response.data, 1)
          }];
        });
    }

    loadDailySales() {
      var formatDate = function(d) {
        var date = moment(d);
        return date.format('MM/DD');
      };
      var formatFullDate = function(d) {
        return moment(d).format('YYYY/MM/DD HH:mm');
      };

      this.ClinicSales.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          this.dailySalesChartOptions = {
            chart: {
              type: 'multiChart',
              height: 300,
              color: ['#1e88e5','#1e88e5'],
              margin : {top: 16, right: 40, bottom: 24, left: 40},
              x: function(d) {return d[0];},
              y: function(d) {return d[1];},
              xAxis: {
                tickFormat: formatDate
              },
              bar1: {
                tickFormat: function(d) {return d;},
              },
              line1: {
                tickFormat: function(d) {return d;},
              },
              tooltip: {
                keyFormatter: formatFullDate
              }
            }
          };
          this.dailySalesChartData = [
            {
              key: 'Sales',
              bar: true,
              values: response.data
            },
            {
              key: 'Tickets',
              values: response.data
            }
          ];
        });
    }

    loadMonthlySales() {
      var formatDate = function(d) {
        var date = moment(d);
        return date.format('MM/DD');
      };
      var formatFullDate = function(d) {
        return moment(d).format('YYYY/MM/DD HH:mm');
      };

      this.ClinicSales.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          this.monthlySalesChartOptions = {
            chart: {
              type: 'historicalBarChart',
              height: 300,
              color: ['#1e88e5'],
              margin : {top: 16, right: 40, bottom: 24, left: 40},
              x: function(d) {return d[0];},
              y: function(d) {return d[1];},
              showControls: true,
              showValues: true,
              xAxis: {
                tickFormat: formatDate
              },
              tooltip: {
                keyFormatter: formatFullDate
              }
            }
          };
          this.monthlySalesChartData = [{
            key: 'Sales',
            values: response.data
          }];
        });
    }
  }

  DashboardController.$inject = ['$stateParams', '$filter', 'ClinicOutline', 'ClinicTicketSummary', 'ClinicSales', 'clinics', 'clinic'];
  angular.module('petzApp')
    .controller('DashboardController', DashboardController);

})();
