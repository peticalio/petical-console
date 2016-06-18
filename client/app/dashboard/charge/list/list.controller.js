(() => {
  'use strict';

  class ChargeListController {
    constructor($state, toaster, ClinicCharge, clinic, charges) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicCharge = ClinicCharge;
      this.clinic = clinic;
      this.charges = charges;
      this.page = 1;
      this.limit = 20;
    }

    // 商品マスタをリフレッシュする
    refresh() {
      this.ClinicCharge.fetch({clinicId: this.clinic.id}).$promise
        .then((response) => {
          this.charges = response;
          this.toaster.info('診察料金の一覧を更新しました。');
        });
    }

    sort(key) {
      this.order = key;
      this.reverse = !this.reverse;
    }
  }

  ChargeListController.$inject = ['$state', 'toaster', 'ClinicCharge', 'clinic', 'charges'];
  angular.module('petzApp')
    .controller('ChargeListController', ChargeListController);

})();
