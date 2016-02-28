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

    // // angular-ui用処理
    // transformTag(newTag) {
    //   return {name: newTag};
    // }
    //
    // // 生年月日選択ダイアログの表示制御
    // this.openedBirthDate = false;
    // openBirthDateDialog($event) {
    //   $event.stopPropagation();
    //   this.openedBirthDate = !this.openedBirthDate;
    // }
    //
    // // マイクロチップ埋め込み日選択ダイアログの表示制御
    // this.openedMicrochipDate = false;
    // openMicrochipDateDialog($event) {
    //   $event.stopPropagation();
    //   this.openedMicrochipDate = !this.openedMicrochipDate;
    // }

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
      // FIXME md-autocompleteにバグがあるため
      if (chart.pet.type == null) chart.pet.type = this.typeText;
      if (chart.pet.color == null) chart.pet.color = this.colorText;
      if (chart.pet.blood == null) chart.pet.blood = this.bloodText;
      console.log(chart);
      this.ClinicChart.save({clinicId: this.$stateParams.clinicId}, chart).$promise
        .then((response) => {
          this.toaster.info('新しくカルテを作成しました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId: this.$stateParams.clinicId, customerId: this.$stateParams.customerId, chartId: response.data.id});
        });
    }

    // カルテを保存する
    update(chart) {
      return Chart.update({clinicId:$stateParams.clinicId, chartId:chart.id}, chart).$promise
        .then(function(response) {
          Notify.success('カルテを保存しました。');
          $state.go('app.dashboard.chart.detail', {clinicId:$stateParams.clinicId, customerId:$stateParams.customerId, chartId:chart.id});
          return response.$promise;
        });
    }
  }

  ChartFormController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicChart', 'types', 'colors', 'bloods', 'tags', 'customer'];
  angular
    .module('petzApp')
    .controller('ChartFormController', ChartFormController);

})();
