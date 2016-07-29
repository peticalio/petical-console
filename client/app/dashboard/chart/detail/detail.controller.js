(() => {
  'use strict';

  class ChartDetailController {
    constructor($state, dialog, toaster, ClinicChart, ClinicTicket, ClinicChartTicket, clinic, chart) {
      this.$state = $state;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.ClinicTicket = ClinicTicket;
      this.ClinicChartTicket = ClinicChartTicket;
      this.clinic = clinic;
      this.chart = chart;
      this.target = new Date(new Date().setMonth(new Date().getMonth() - 3));
      this.order = 'startDateTime';
      this.reverse = true;
    }

    // ソートキーを指定する
    sort(key) {
      this.order = key;
      this.reverse = !this.reverse;
    }

    // ステートから選択されているタブ番号を取得する

    showRabidAlert() {
      var vaccine = new Date(this.chart.rabidVaccineDate);
      return this.target >= vaccine;
    }
    showMixVaccineAlert() {
      var vaccine = new Date(this.chart.mixVaccineDate);
      return this.target >= vaccine;
    }
    showFilariaAlert() {
      var vaccine = new Date(this.chart.filariaDate);
      return this.target >= vaccine;
    }
    showFleaAlert() {
      var vaccine = new Date(this.chart.fleaDate);
      return this.target >= vaccine;
    }

    // カルテを削除する
    delete(event, chart) {
      this.dialog.delete(event, chart)
        .then(() => this.ClinicChart.delete({clinicId: this.clinic.id, chartId: chart.id}).$promise)
        .then(() => {
          this.toaster.info(chart.pet.name + ' ちゃんのカルテを削除しました。');
          this.$state.go('app.dashboard.chart', {}, {reload:true});
        });
    }

    // 診察履歴を取得する
    loadHistories() {
      this.ClinicChartTicket.query({clinicId: this.clinic.id, chartId: this.chart.id}).$promise
        .then((response) => {
          this.histories = response;
        });
    }

    // コメントを取得する
  }

  ChartDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicChart', 'ClinicTicket', 'ClinicChartTicket', 'clinic', 'chart'];
  angular.module('petzApp')
    .controller('ChartDetailController', ChartDetailController);

})();
