(() => {
  'use strict';

  class ChartDetailReservationController {
    constructor($state, toaster, ClinicChartTicket, clinic, chart, tickets) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicChartTicket = ClinicChartTicket;
      this.clinic = clinic;
      this.chart = chart;
      this.tickets = tickets;
    }

    // 一覧を更新する
    refresh() {
      this.ClinicChartTicket.fetch({clinicId: this.clinic.id, chartId: this.chart.id}).$promise
        .then((response) => {
          this.toaster.info('診察内容の一覧を更新しました。');
          this.tickets = response;
        });
    }
  }

  ChartDetailReservationController.$inject = ['$state', 'toaster', 'ClinicChartTicket', 'clinic', 'chart', 'tickets'];
  angular.module('petzApp')
    .controller('ChartDetailReservationController', ChartDetailReservationController);

})();
