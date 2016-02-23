(()=> {
  'use strict';

  class ClinicFormController {
    constructor($state, toaster, Clinic, clinic) {
      this.state = $state;
      this.toaster = toaster;
      this.Clinic = Clinic;
      this.clinic = clinic;
    }

    // クリニックを新規登録する
    save(clinic) {
      this.Clinic.save(clinic).$promise
        .then((response) => {
          this.toaster.info('動物病院を新しく登録しました。');
          this.state.go('app.dashboard', {clinicId: response.data.id});
        });
    }
  }

  ClinicFormController.$inject = ['$state', 'toaster', 'Clinic', 'clinic'];
  angular.module('petzApp')
    .controller('ClinicFormController', ClinicFormController);

})();
