(() => {
  'use strict';

  class ChargeFormController {
    constructor($state, toaster, ClinicCharge, clinic, charge, charges) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicCharge = ClinicCharge;
      this.clinic = clinic;
      this.charge = charge;
      // this.taxTypes = [{name: '外税', value: 'EXCLUSIVE'}, {name: '内税', value: 'INCLUSIVE'}];

      this.courses = Array.from(new Set(charges.map((item) => item.course)));
      this.categories = Array.from(new Set(charges.map((item) => item.category)));
    }

    // 診察料金を登録する
    save(charge) {
      this.ClinicCharge.save({clinicId: this.clinic.id}, charge).$promise
        .then(() => {
          this.toaster.info('診察料金を登録しました。');
          this.$state.go('app.dashboard.charge', {}, {reload: true});
        });
    }

    // 診察料金を更新する
    update(charge) {
      this.ClinicCharge.update({clinicId: this.clinic.id, chargeId: charge.id}, charge).$promise
        .then(() => {
          this.toaster.info('診察料金を更新しました。');
          this.$state.go('app.dashboard.charge', {}, {reload: true});
        });
    }
  }

  ChargeFormController.$inject = ['$state', 'toaster', 'ClinicCharge', 'clinic', 'charge', 'charges'];
  angular.module('petzApp')
    .controller('ChargeFormController', ChargeFormController);

})();
