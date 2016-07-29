(() => {
  'use strict';

  class InspectionDetailController {
    constructor($state, dialog, toaster, ClinicInspection, clinic, inspection) {
      this.$state = $state;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicInspection = ClinicInspection;
      this.clinic = clinic;
      this.inspection = inspection;
    }

    delete(event, inspection) {
      this.dialog.delete(event, inspection)
        .then(() => this.ClinicInspection.delete({clinicId: this.clinic.id, inspectionId: inspection.id}))
        .then(() => {
          this.toaster.info('診察料金を削除しました。');
          this.$state.go('app.dashboard.inspection', {}, {reload: true});
        });
    }
  }

  InspectionDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicInspection', 'clinic', 'inspection'];
  angular.module('petzApp')
    .controller('InspectionDetailController', InspectionDetailController);

})();
