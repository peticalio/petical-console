(() => {
  'use strict';

  class VaccineFormController {
    constructor($state, toaster, ClinicVaccine, clinic, vaccine) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicVaccine = ClinicVaccine;
      this.clinic = clinic;
      this.vaccine = vaccine;
    }

    // ワクチンを登録する
    save(vaccine) {
      this.ClinicVaccine.save({clinicId: this.clinic.id}, vaccine).$promise
        .then(() => {
          this.toaster.info('新しい予防接種ワクチンを登録しました。');
          this.$state.go('app.dashboard.vaccine.list');
        });
    }

    // ワクチンを更新する
    update(vaccine) {
      this.ClinicVaccine.update({clinicId: this.clinic.id, vaccineId: vaccine.id}, vaccine).$promise
        .then(() => this.ClinicVaccine.fetch({clinicId: this.clinic.id}).$promise)
        .then(() => {
          this.toaster.info('予防接種ワクチンの情報を更新しました。');
          this.$state.go('app.dashboard.vaccine.list');
        });
    }
  }

  VaccineFormController.$inject = ['$state', 'toaster', 'ClinicVaccine', 'clinic', 'vaccine'];
  angular.module('petzApp')
    .controller('VaccineFormController', VaccineFormController);

})();
