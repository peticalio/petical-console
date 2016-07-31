(() => {
  'use strict';

  class ChartFormController {
    constructor($state, $stateParams, toaster, ClinicChart, clinic, kinds, types, colors, bloods, chart) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.clinic = clinic;
      this.kinds = kinds;
      this.types = types;
      this.colors = colors;
      this.bloods = bloods;

      this.chart = chart;
      this.chart.pet.neutral = this.convert4nya(chart.pet.neutral);
      this.chart.pet.dead = this.convert4nya(chart.pet.dead);
      this.sexes = [{name:'不明', value:''}, {name:'オス', value:'MALE'}, {name:'メス', value:'FEMALE'}];
      this.neutrals = [{name:'去勢・避妊手術していない', value:false}, {name:'去勢・避妊手術済み', value:true}];
      this.deads = [{name:'生存している', value:false}, {name:'死亡している', value:true}];
      this.today = new Date();
    }

    convert4nya(value) {
      return (value) ? 'true' : 'false';
    }

    // カルテを登録する
    save(chart) {
      chart.clinic = this.clinic;
      return this.ClinicChart.save({clinicId: this.clinic.id}, chart).$promise
        .then((response) => {
          this.toaster.info('新しくカルテを作成しました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId: this.clinic.id, customerId: this.$stateParams.customerId, chartId: response.data.id});
          return response.$promise;
        });
    }

    // カルテを保存する
    update(chart) {
      chart.clinic = this.clinic;
      return this.ClinicChart.update({clinicId: this.clinic.id, chartId: chart.id}, chart).$promise
        .then((response) => {
          this.toaster.info('カルテを保存しました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId: this.clinic.id, customerId: this.$stateParams.customerId, chartId: response.data.id});
          return response.$promise;
        });
    }
  }

  ChartFormController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicChart', 'clinic', 'kinds', 'types', 'colors', 'bloods', 'chart'];
  angular
    .module('petzApp')
    .controller('ChartFormController', ChartFormController);

})();
