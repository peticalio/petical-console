(()=> {
  'use strict';

  class CustomerFormController {
    constructor($state, $stateParams, dialog, toaster, ClinicCustomer, clinic, customer) {
      this.$state = $state;
      this.params = $stateParams;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicCustomer = ClinicCustomer;
      this.clinic = clinic;
      this.customer = customer;
      this.useEmailForLoginId = true;
    }

    // メールアドレスをログインIDフィールドにコピーする
    copyEmailToLogin() {
      if (!this.customer.id) {
        this.customer.user.login = this.customer.user.email;
      }
    }

    // 飼い主を新規登録する
    save(customer) {
      this.ClinicCustomer.save({clinicId:this.clinic.id, customerId:'validate'}, customer).$promise
        .then((response) => {
          // ユーザーが重複していたらマージするか確認し、そうでなければそのまま登録する
          if (response.data.id) {
            this.dialog.select({title:'同じメールアドレスのユーザーが既に存在しています。', message:'同じメールアドレスのユーザーが既に存在しています。\nこのユーザーの情報を飼い主の基本情報として使用しますか？'})
              .then(
                () => {
                  // 既存ユーザーに紐付けて飼い主を登録する
                  return this.ClinicCustomer.update({clinicId:this.clinic.id}, customer).$promise
                    .then((response) => {
                      this.toaster.info('既存ユーザーに紐付けて飼い主さまを登録しました。');
                      this.$state.go('app.dashboard.customer.detail', {clinicId:this.clinic.id, customerId:response.data.id});
                    });
                },
                () => {
                  // 既存ユーザーに紐付けないで、ユーザーから新規の飼い主を登録する
                  return this.ClinicCustomer.save({clinicId:this.clinic.id, force:true}, customer).$promise
                    .then((response) => {
                      this.toaster.info('新しく飼い主さまを登録しました。');
                      this.$state.go('app.dashboard.customer.detail', {clinicId:this.clinic.id, customerId:response.data.id});
                    });
                });
          } else {
            // 重複ユーザーがいないので、そのまま新規の飼い主として登録する
            return this.ClinicCustomer.save({clinicId:this.clinic.id}, customer).$promise
              .then((response) => {
                this.toaster.info('新しい飼い主さまを登録しました。');
                this.$state.go('app.dashboard.customer.detail', {clinicId:this.clinic.id, customerId:response.data.id});
              });
          }
        });
    }

    // 飼い主を変更する
    update(customer) {
      this.ClinicCustomer.update({clinicId: this.params.clinicId, customerId: customer.id}, customer).$promise
        .then(() => {
          return this.ClinicCustomer.clear({clinicId: this.params.clinicId}).$promise;
        })
        .then(() => {
          this.toaster.info('飼い主さまの情報を変更しました。');
          this.$state.go('app.dashboard.customer.detail', {clinicId: this.params.clinicId, customerId: customer.id});
        });
    }
  }

  CustomerFormController.$inject = ['$state', '$stateParams', 'dialog', 'toaster', 'ClinicCustomer', 'clinic', 'customer'];
  angular.module('petzApp')
    .controller('CustomerFormController', CustomerFormController);

})();
