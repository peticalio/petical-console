(() => {
  'use strict';

  class ChartListController {
    constructor($state, $stateParams, toaster, ClinicChart) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.criteria = {};
      this.refresh(this.criteria);
    }

    // カルテを検索する
    refresh(criteria) {
      return this.ClinicChart.query(criteria).$promise
        .then((response) => {
          return response;
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

  ChartListController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicChart'];
  angular.module('petzApp')
    .controller('ChartListController', ChartListController);

})();
