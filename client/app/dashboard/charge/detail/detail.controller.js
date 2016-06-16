(() => {
  'use strict';

  class ChargeDetailController {
    constructor($state, dialog, toaster, ClinicCharge, clinic, charge) {
      this.$state = $state;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicCharge = ClinicCharge;
      this.clinic = clinic;
      this.charge = charge;
    }

    delete(event, charge) {
      this.dialog.delete(event, charge)
        .then(() => this.ClinicCharge.delete({clinicId: this.clinic.id, chargeId: charge.id}))
        .then(() => {
          this.toaster.info('診察料金を削除しました。');
          this.$state.go('app.dashboard.charge', {}, {reload: true});
        });
    }
  }

  ChargeDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicCharge', 'clinic', 'charge'];
  angular.module('petzApp')
    .controller('ChargeDetailController', ChargeDetailController);

})();
