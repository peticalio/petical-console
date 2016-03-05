(() => {
  'use strict';

  class ChartListController {
    constructor($state, $stateParams, toaster, ClinicChart, charts) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.charts = charts;
    }

    // カルテを検索する
    refresh() {
      return this.ClinicChart.fetch({clinicId: this.$stateParams.clinicId}).$promise
        .then((response) => {
          this.charts = response;
          this.toaster.info('カルテの一覧を更新しました。');
          return response.$promise;
        });
    }

    // ペットの診察予約をする
    reserve() {
      // var ticket = {clinic: chart.clinic, chart: chart};
      // Modal.open('app/dashboard/common/event/event-modal.html', 'EventModalController', 'ctrl', {ticket: function() {return ticket;}}).result
      //   .then(function(data) {
      //     if (data) {
      //       this.toaster.success('診察の予約を登録しました。詳細は予約スケジュールをご確認ください。');
      //     }
      //   });
    }
  }

  ChartListController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicChart', 'charts'];
  angular.module('petzApp')
    .controller('ChartListController', ChartListController);

})();
