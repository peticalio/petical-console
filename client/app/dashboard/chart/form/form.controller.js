(() => {
  'use strict';

  class ChartFormController {
    constructor($state, $stateParams, toaster, ClinicChart, clinic, kinds, types, colors, bloods, tags, chart) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.clinic = clinic;
      this.kinds = kinds;
      this.types = types;
      this.colors = colors;
      this.bloods = bloods;
      this.tags = tags;
      this.chart = chart;
      this.sexes = ['不明', 'オス', 'メス'];
      this.neutrals = ['去勢・避妊手術済み', '去勢・避妊手術していない'];
      this.deads = ['生存している', '死亡している'];
      this.today = new Date();
    }

    // カルテを登録する
    save(chart) {
      chart.clinic = this.clinic;
      chart.pet.sex = this.resolveSex(chart.pet.sex);
      chart.pet.neutral = this.resolveNeutralFlag(chart.pet.neutral);
      chart.pet.dead = this.resolveDeadFlag(chart.pet.dead);
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
      chart.pet.sex = this.resolveSex(chart.pet.sex);
      chart.pet.neutral = this.resolveNeutralFlag(chart.pet.neutral);
      chart.pet.dead = this.resolveDeadFlag(chart.pet.dead);
      return this.ClinicChart.update({clinicId: this.clinic.id, chartId: chart.id}, chart).$promise
        .then((response) => {
          this.toaster.info('カルテを保存しました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId: this.clinic.id, customerId: this.$stateParams.customerId, chartId: response.data.id});
          return response.$promise;
        });
    }

    resolveSex(value) {
      switch (value) {
        case 'オス':
          return 'MALE';
        case 'メス':
          return 'FEMALE';
        default:
          return null;
      }
    }
    resolveNeutralFlag(value) {
      switch (value) {
        case '去勢・避妊手術していない':
          return false;
        case '去勢・避妊手術済み':
          return true;
        default:
          return null;
      }
    }
    resolveDeadFlag(value) {
      switch (value) {
        case '生存している':
          return false;
        case '死亡している':
          return true;
        default:
          return null;
      }
    }
  }

  ChartFormController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicChart', 'clinic', 'kinds', 'types', 'colors', 'bloods', 'tags', 'chart'];
  angular
    .module('petzApp')
    .controller('ChartFormController', ChartFormController);

})();
