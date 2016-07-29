(() => {
  'use strict';

  class CustomerDetailController {
    constructor($q, $state, $stateParams, dialog, toaster, ClinicCustomer, UserPet, ClinicCustomerChart, clinic, customer, pets, charts) {
      this.$q = $q;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicCustomer = ClinicCustomer;
      this.UserPet = UserPet;
      this.ClinicCustomerChart = ClinicCustomerChart;
      this.clinic = clinic;
      this.customer = customer;
      this.pets = pets;
      this.charts = charts;
      // this.relate();
    }

    // 飼い主を削除する
    delete(event, customer) {
      this.dialog.delete(event, customer)
        .then(() => {
          return this.ClinicCustomer.delete({clinicId: this.$stateParams.clinicId, customerId: this.$stateParams.customerId});
        })
        .then(() => {
          this.toaster.info('飼い主さまを削除しました。');
          return this.ClinicCustomer.fetch({clinicId: this.$stateParams.clinicId}).$promise;
        })
        .then(() => {
          this.$state.go('app.dashboard.customer');
        });
    }

    // カルテをリフレッシュする
    refresh() {
      let pets = this.UserPet.fetch({userId: this.customer.user.id}).$promise
        .then((response) => response);
      let charts = this.ClinicCustomerChart.fetch({clinicId: this.$stateParams.clinicId, customerId: this.$stateParams.customerId}).$promise
        .then((response) => response);
      this.$q.all([pets, charts])
        .then(() => {
          this.relate();
          this.toaster.info('ペットの一覧を更新しました。');
        });
    }

    // 所有ペットとカルテを関連付ける（privateな処理）
    relate() {
      this.pets.some((pet) => {
        this.charts.some((chart) => {
          if (chart.pet && pet.id === chart.pet.id) {
            pet.chart = chart;
          }
        });
      });
    }

    // カルテを表示する（カルテがない場合は作成ページを表示する）
    goChart(customer, pet) {
      if (pet.chart) {
        this.$state.go('app.dashboard.chart.detail', {clinicId: this.$stateParams.clinicId, chartId: pet.chart.id});
      } else {
        this.$state.go('app.dashboard.chart.import', {clinicId: this.$stateParams.clinicId, customerId: customer.id, petId: pet.id});
      }
    }
  }

  CustomerDetailController.$inject = ['$q', '$state', '$stateParams', 'dialog', 'toaster', 'ClinicCustomer', 'UserPet', 'ClinicCustomerChart', 'clinic', 'customer', 'pets', 'charts'];
  angular.module('petzApp')
    .controller('CustomerDetailController', CustomerDetailController);

})();
