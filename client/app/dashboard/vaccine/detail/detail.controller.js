(() => {
  'use strict';

  class VaccineDetailController {
    constructor($state, dialog, toaster, ClinicVaccine, clinic, vaccine) {
      this.$state = $state;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicVaccine = ClinicVaccine;
      this.clinic = clinic;
      this.vaccine = vaccine;
    }

    // ワクチンを削除する
    delete(event, vaccine) {
      this.dialog.delete(event, vaccine)
        .then(() => this.ClinicVaccine.delete({clinicId: this.clinic.id, vaccineId: vaccine.id}))
        .then(() => this.ClinicVaccine.fetch({clinicId: this.clinic.id}))
        .then(() => {
          this.toaster.info('予防接種ワクチンを削除しました。');
          this.$state.go('app.dashboard.vaccine.list');
        });
    }
  }

  VaccineDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicVaccine', 'clinic', 'vaccine'];
  angular.module('petzApp')
    .controller('VaccineDetailController', VaccineDetailController);

})();
