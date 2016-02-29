(() => {
  'use strict';

  class ChartFormController {
    constructor($state, $stateParams, toaster, ClinicChart, types, colors, bloods, tags, customer) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.types = types;
      this.colors = colors;
      this.bloods = bloods;
      this.tags = tags;
      this.sexes = [{name:'不明', value:''}, {name:'オス', value:'MALE'}, {name:'メス', value:'FEMALE'}];
      this.neutrals = [{name:'していない', value:false}, {name:'済み', value:true}];
      this.customer = customer;

      this.chart = {customer:customer, pet:{}};
    }

    // 種類を取得する（オートコンプリート用）
    getTypes(text) {
      return this.types.filter((item) => {
        return (item.indexOf(text) >= 0) ? true : false;
      });
    }

    // 毛色を取得する（オートコンプリート用）
    getColors(text) {
      return this.colors.filter((item) => {
        return (item.indexOf(text) >= 0) ? true : false;
      });
    }

    // 血液型を取得する（オートコンプリート用）
    getBloods(text) {
      return this.bloods.filter((item) => {
        return (item.indexOf(text) >= 0) ? true : false;
      });
    }

    // カルテを登録する
    save(chart) {
      this.supportAutocomplete(chart);
      return this.ClinicChart.save({clinicId: this.$stateParams.clinicId}, chart).$promise
        .then((response) => {
          this.toaster.info('新しくカルテを作成しました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId: this.$stateParams.clinicId, customerId: this.$stateParams.customerId, chartId: response.data.id});
          return response.$promise;
        });
    }

    // カルテを保存する
    update(chart) {
      this.supportAutocomplete(chart);
      return this.ClinicChart.update({clinicId: this.$stateParams.clinicId, chartId: chart.id}, chart).$promise
        .then((response) => {
          this.toaster.info('カルテを保存しました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId: this.$stateParams.clinicId, customerId: this.$stateParams.customerId, chartId: response.data.id});
          return response.$promise;
        });
    }

    // FIXME md-autocompleteにバグがあるため
    supportAutocomplete(chart) {
      if (angular.isDefined(this.typeText)) {
        chart.pet.type = this.typeText;
      }
      if (angular.isDefined(this.colorText)) {
        chart.pet.color = this.colorText;
      }
      if (angular.isDefined(this.bloodText)) {
        chart.pet.blood = this.bloodText;
      }
    }
  }

  ChartFormController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicChart', 'types', 'colors', 'bloods', 'tags', 'customer'];
  angular
    .module('petzApp')
    .controller('ChartFormController', ChartFormController);

})();
