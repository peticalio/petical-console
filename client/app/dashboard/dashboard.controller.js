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
      this.ticketChartOptions = this.getTicketChartOptions();
      this.dailySalesChartOptions = this.getSalesAndTicketsChartOptions('MM/DD');
      this.monthlySalesChartOptions = this.getSalesAndTicketsChartOptions('MMM');
      this.writeTicketChart();
      this.writeDailySalesChart();
      this.writeMonthlySalesChart();
    }

    getClinicOutline() {
      return this.ClinicOutline.get({clinicId: this.$stateParams.clinicId, year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()}).$promise
        // .then((response) => response.$promise);
        .then((response) => {
          this.outline = response;
          return response.$promise;
        });
    }

    // チケットチャートを描画する
    writeTicketChart() {
      this.ClinicTicketSummary.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          this.ticketChartData = [{
            key:    '診察完了',
            color:  '#999',
            values: this.transform(response.data, 1, 0)
          }, {
            key:    '診察中・予約中',
            color:  '#428bca',
            values: this.transform(response.data, 2, 1)
          }];
        });
    }

    // 日次売上チャートを描画する
    writeDailySalesChart() {
      this.ClinicSales.get({clinicId: this.$stateParams.clinicId, type: 'daily'}).$promise
        .then((response) => {
          this.dailySalesChartData = [
            this.getSalesAmountChartDefs(response.data),
            this.getTicketCountChartDefs(response.data)
          ];
        });
    }

    // 月次売上チャートを描画する
    writeMonthlySalesChart() {
      this.ClinicSales.get({clinicId: this.$stateParams.clinicId, type: 'monthly'}).$promise
        .then((response) => {
          this.monthlySalesChartData = [
            this.getSalesAmountChartDefs(response.data),
            this.getTicketCountChartDefs(response.data)
          ];
        });
    }

    // 売上チャートの定義を取得する
    getSalesAmountChartDefs(data) {
      return {
        key:    '売上額',
        color:  '#5bc0de',
        type:   'bar',
        yAxis:  1,
        values: this.transform(data, 1, 1)
      };
    }

    // 診察数チャートの定義を取得する
    getTicketCountChartDefs(data) {
      return {
        key:    '診察数',
        color:  '#f0ad4e',
        type:   'line',
        yAxis:  2,
        values: this.transform(data, 2, 2)
      };
    }

    // グラフデータからD3のチャートデータに変換する
    transform(data, i, series) {
      return data.map((d) => {
        return {x: d[0], y: d[i], series: series};
      });
    }

    // ----- 各種チャート定義の取得 -----
    // 診察数のチャートオプションを取得する
    getTicketChartOptions() {
      var formatTime = function(d) {
        return moment(d).format('HH:mm');
      };
      return {
        chart: {
          type: 'multiBarChart',
          height: 300,
          margin : {top: 16, right: 40, bottom: 40, left: 64},
          clipEdge: true,
          stacked: false,
          xAxis: {
            axisLabel: 'Time (HH:mm)',
            tickFormat: formatTime
          },
          yAxis: {
            axisLabel: 'Count'
          }
        }
      };
    }

    // 売上額と診察数のチャートオプションを取得する
    getSalesAndTicketsChartOptions(format) {
      var formatDate = function(d) {
        var date = moment(d);
        return date.format(format);
      };
      return {
        chart: {
          type: 'multiChart',
          height: 300,
          useInteractiveGuideline: true,
          margin : {top: 16, right: 40, bottom: 24, left: 40},
          xAxis: {
            axisLabel: 'Date',
            tickFormat: formatDate
          },
          yAxis1: {
            axisLabel: 'Sales',
            tickFormat: function(d) {return d;}
          },
          yAxis2: {
            axisLabel: 'Count',
            tickFormat: function(d) {return d;}
          }
        }
      };
    }
  }

  DashboardController.$inject = ['$stateParams', '$filter', 'ClinicOutline', 'ClinicTicketSummary', 'ClinicSales', 'clinics', 'clinic'];
  angular.module('petzApp')
    .controller('DashboardController', DashboardController);

})();
