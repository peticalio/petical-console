(() => {
  'use strict';

  class VaccineListController {
    constructor($state, toaster, ClinicVaccine, clinic, vaccines) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicVaccine = ClinicVaccine;
      this.clinic = clinic;
      this.vaccines = vaccines;
    }

    // ワクチンを再取得する
    refresh() {
      this.ClinicVaccine.fetch({clinicId: this.clinic.id}).$promise
        .then((response) => {
          this.vaccines = response;
          this.toaster.info('予防接種ワクチンの一覧を更新しました。');
        });
    }
  }

  VaccineListController.$inject = ['$state', 'toaster', 'ClinicVaccine', 'clinic', 'vaccines'];
  angular.module('petzApp')
    .controller('VaccineListController', VaccineListController);

})();
