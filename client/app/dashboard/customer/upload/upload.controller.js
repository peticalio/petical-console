(()=> {
  'use strict';

  class CustomerUploadController {
    constructor($state, $q, toaster, hotRegisterer, ClinicCustomer, ValidatorFactory, clinic) {
      // set parameters
      this.$state = $state;
      this.$q = $q;
      this.toaster = toaster;
      this.hotRegisterer = hotRegisterer;
      this.ClinicCustomer = ClinicCustomer;
      this.clinic = clinic;

      // set validators
      this.nameValidator = ValidatorFactory.createNameValidator();
      this.requiredNameValidator = ValidatorFactory.createRequiredNameValidator();
      this.requiredZipCodeValidator = ValidatorFactory.createRequiredZipCodeValidator();
      this.requiredPhoneNoValidator = ValidatorFactory.createRequiredPhoneNoValidator();
      this.phoneNoValidator = ValidatorFactory.createPhoneNoValidator();
      this.emailValidator = ValidatorFactory.createEmailValidator();

      // set default form values
      this.customers = [];
      this.settings = {contextMenu: ['row_above', 'row_below', 'remove_row']};
      this.container = document.getElementById('main-content');
    }

    // 高さを計算する
    getHeight() {
      var height = this.container.offsetHeight;
      return height - 72 - 72;
    }

    // 不正値がないことをチェックする
    isValid() {
      var invalids = document.getElementsByClassName('htInvalid');
      return invalids.length === 0;
    }

    // 一括登録する
    save(customers) {
      var counter = 0; // 処理成功数
      var array = [];  // エラーレコードを保持する配列

      // 順番に削除する（非同期処理）
      var promises = [];
      customers.forEach((item) => {
        if (item && item.user && item.user.firstName && item.user.lastName) {
          item.clinic = this.clinic;
          var promise = this.ClinicCustomer.save({clinicId: this.clinic.id}, item).$promise
            .then(() => counter++)
            .catch(() => array.push(item));
          promises.push(promise);
        }
      });

      // 全て削除処理したら正常終了したかチェック
      this.$q.all(promises).then(() => {
        customers.length = 0;
        if (array.length !== 0) {
          // 新規オブジェクトにしないとhandsontableがエラーになるため、エラーレコードはコピーしてプッシュする
          array.forEach((item) => customers.push({customerCode: item.customerCode, user: item.user}));
          this.toaster.error(counter + '件は登録しましたが、' + array.length + '件は登録できませんでした。');
        } else {
          this.toaster.info(counter + '件の飼い主さまを登録しました。');
        }
      });
    }
  }

  CustomerUploadController.$inject = ['$state', '$q', 'toaster', 'hotRegisterer', 'ClinicCustomer', 'ValidatorFactory', 'clinic'];
  angular.module('petzApp')
    .controller('CustomerUploadController', CustomerUploadController);

})();
