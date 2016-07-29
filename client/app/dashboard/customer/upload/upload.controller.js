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
      this.customers = [{}];
      this.settings = {contextMenu: ['row_above', 'row_below', 'remove_row']};
      this.progress = 0;
    }

    // 不正値がないことをチェックする
    isValid() {
      var invalids = document.getElementsByClassName('htInvalid');
      return invalids.length === 0;
    }

    // 一括登録する
    save(customers) {
      this.progress = 1; // すぐにブロックしたいので1%にする
      var size = customers.length;
      var counter = 0; // 処理成功数
      var array = [];  // エラーレコードを保持する配列

      // 順番に削除する（非同期処理）
      var promises = [];
      customers.forEach((item) => {
        if (item && item.user && item.user.firstName && item.user.lastName) {
          item.clinic = this.clinic;
          var promise = this.ClinicCustomer.save({clinicId:this.clinic.id, force:true}, item).$promise
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
        customers.length = 0;
        if (array.length !== 0) {
          // 新規オブジェクトにしないとhandsontableがエラーになるため、エラーレコードはコピーしてプッシュする
          array.forEach((item) => customers.push({customerCode: item.customerCode, user: item.user}));
          this.toaster.error(counter + '件は登録しましたが、' + array.length + '件は登録できませんでした。');
        } else {
          this.toaster.info(counter + '件の飼い主さまを登録しました。');
        }
        customers.push({});
        this.progress = 0; // プログレスバーをリセット
      });
    }
  }

  CustomerUploadController.$inject = ['$state', '$q', 'toaster', 'hotRegisterer', 'ClinicCustomer', 'ValidatorFactory', 'clinic'];
  angular.module('petzApp')
    .controller('CustomerUploadController', CustomerUploadController);

})();
