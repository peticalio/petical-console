(() => {
  'use strict';

  class ChartDetailController {
    constructor($state, dialog, toaster, ClinicChart, ClinicTicket, clinic, chart) {
      this.$state = $state;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.ClinicTicket = ClinicTicket;
      this.clinic = clinic;
      this.chart = chart;
      this.selected = this.getSelectedTabNo();
      this.target = new Date(new Date().setMonth(new Date().getMonth() - 3));
    }

    // ステートから選択されているタブ番号を取得する
    getSelectedTabNo() {
      var no = 0;
      no = this.$state.includes('app.dashboard.chart.detail.ticket') ? 1 : no;
      no = this.$state.includes('app.dashboard.chart.detail.reservation') ? 2 : no;
      return no;
    }

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
        .then(() => this.ClinicChart.fetch({clinicId: this.clinic.id}).$promise)
        .then(() => {
          this.toaster.info(chart.pet.name + ' ちゃんのカルテを削除しました。');
          this.$state.go('app.dashboard.chart.list');
        });
    }
  }

  ChartDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicChart', 'ClinicTicket', 'clinic', 'chart'];
  angular.module('petzApp')
    .controller('ChartDetailController', ChartDetailController);

})();
