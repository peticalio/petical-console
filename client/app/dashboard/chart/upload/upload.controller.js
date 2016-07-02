(()=> {
  'use strict';

  class ChartUploadController {
    constructor($state, $q, toaster, ClinicChart, ValidatorFactory, clinic) {
      // set parameters
      this.$state = $state;
      this.$q = $q;
      this.toaster = toaster;
      this.ClinicChart = ClinicChart;
      this.clinic = clinic;

      // set validators
      this.nameValidator = ValidatorFactory.createNameValidator();
      this.requiredNameValidator = ValidatorFactory.createRequiredNameValidator();
      this.sexValidator = ValidatorFactory.createSexValidator();
      this.dateValidator = ValidatorFactory.createDateValidator();
      this.flagValidator = ValidatorFactory.createFlagValidator();
      this.memoValidator = ValidatorFactory.createMemoValidator();

      // set default form values
      this.charts = [{}];
      this.settings = {contextMenu: ['row_above', 'row_below', 'remove_row']};
      this.progress = 0;
    }

    // 不正値がないことをチェックする
    isValid() {
      var invalids = document.getElementsByClassName('htInvalid');
      return invalids.length === 0;
    }

    // 日付オブジェクトにする
    getDate(v) {
      if (v) {
        return new Date(v);
      }
      return null;
    }

    // 一括登録する
    save(charts) {
      this.progress = 1; // すぐにブロックしたいので1%にする
      var counter = 0; // 処理成功数
      var array = [];  // エラーレコードを保持する配列
      var size = charts.length;

      // 順番に削除する（非同期処理）
      var promises = [];
      charts.forEach((item) => {
        var chart = angular.copy(item);
        if (chart && chart.customer && chart.customer.customerCode && chart.chartNo && chart.pet && chart.pet.name) {
          chart.clinic = this.clinic;
          chart.pet.birthDate = this.getDate(item.pet.birthDate);
          chart.pet.microchipDate = this.getDate(item.pet.microchipDate);
          chart.creationDate = this.getDate(item.creationDate);
          chart.rabidVaccineDate = this.getDate(item.rabidVaccineDate);
          chart.mixVaccineDate = this.getDate(item.mixVaccineDate);
          chart.filariaDate = this.getDate(item.filariaDate);
          chart.fleaDate = this.getDate(item.fleaDate);
          var promise = this.ClinicChart.save({clinicId: this.clinic.id}, chart).$promise
            .then(() => {
              counter++;
              this.progress = Math.ceil(counter / size * 100);
            })
            .catch(() => array.push(item));
          promises.push(promise);
        }
      });

      // 全て削除処理したら正常終了したかチェック
      this.$q.all(promises).then(() => {
        charts.length = 0;
        if (array.length !== 0) {
          // 新規オブジェクトにしないとhandsontableがエラーになるため、エラーレコードはコピーしてプッシュする
          array.forEach((item) => charts.push({customerCode: item.customerCode, chartNo: item.chartNo, customer: item.customer, pet: item.pet, memo: item.memo, creationDate: item.creationDate, rabidVaccineDate: item.rabidVaccineDate, mixVaccineName: item.mixVaccineName, mixVaccineDate: item.mixVaccineDate, filariaDate: item.filariaDate, fleaDate: item.fleaDate}));
          this.toaster.error(counter + '件は登録しましたが、' + array.length + '件は登録できませんでした。');
        } else {
          this.toaster.info(counter + '件のカルテを登録しました。');
        }
        this.progress = 0; // プログレスバーをリセット
        charts.push({});
      });
    }
  }

  ChartUploadController.$inject = ['$state', '$q', 'toaster', 'ClinicChart', 'ValidatorFactory', 'clinic'];
  angular.module('petzApp')
    .controller('ChartUploadController', ChartUploadController);

})();
