(() => {
  'use strict';

  class ChartDetailController {
    constructor($state, $stateParams, dialog, toaster, ClinicChart, ClinicTicket, chart) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.ClinicTicket = ClinicTicket;
      this.chart = chart;

      this.getTickets();
    }

    // ペットの診察予約ページへ遷移する
    reserve() {
      // var ticket = {clinic:chart.clinic, chart:chart};
      // Modal.open('app/dashboard/common/event/event-modal.html', 'EventModalController', 'ctrl', {ticket: function() {return ticket;}}).result
      //   .then(function() {
      //     Notify.success('診察の予約を登録しました。詳細は予約スケジュールをご確認ください。');
      //   });
    }

    // 診察履歴（チケット）を取得する
    getTickets() {
      return this.ClinicTicket.query({clinicId: this.$stateParams.clinicId, petId: this.chart.pet.id}).$promise
        .then((response) => {
          this.tickets = response;
          return response.$promise;
        });
    }

    // 飼い主を削除する
    delete(event, chart) {
      this.dialog.delete(event, chart)
        .then(() => {
          return this.ClinicChart.delete({clinicId: this.$stateParams.clinicId, chartId: this.$stateParams.chartId});
        })
        .then(() => {
          this.toaster.info(chart.pet.name + ' ちゃんのカルテを削除しました。');
          return this.ClinicChart.fetch({clinicId: this.$stateParams.clinicId}).$promise;
        })
        .then(() => {
          this.$state.go('app.dashboard.chart.list');
        });
    }
  }

  ChartDetailController.$inject = ['$state', '$stateParams', 'dialog', 'toaster', 'ClinicChart', 'ClinicTicket', 'chart'];
  angular.module('petzApp')
    .controller('ChartDetailController', ChartDetailController);

})();
