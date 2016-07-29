(() => {
  'use strict';

  class ChartListController {
    constructor($state, $stateParams, toaster, ClinicChart, charts) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.charts = charts;
      this.order = 'chartNo';
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

    // ソートキーを指定する
    sort(key) {
      this.order = key;
      this.reverse = !this.reverse;
    }
  }

  ChartListController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicChart', 'charts'];
  angular.module('petzApp')
    .controller('ChartListController', ChartListController);

})();
