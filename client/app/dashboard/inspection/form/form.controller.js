(() => {
  'use strict';

  class InspectionFormController {
    constructor($state, toaster, ClinicInspection, clinic, inspection, inspections) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicInspection = ClinicInspection;
      this.clinic = clinic;
      this.inspection = inspection;
      // this.taxTypes = [{name: '外税', value: 'EXCLUSIVE'}, {name: '内税', value: 'INCLUSIVE'}];

      this.courses = Array.from(new Set(inspections.map((item) => item.course)));
      this.categories = Array.from(new Set(inspections.map((item) => item.category)));
    }

    // 診察料金を登録する
    save(inspection) {
      this.ClinicInspection.save({clinicId: this.clinic.id}, inspection).$promise
        .then(() => {
          this.toaster.info('診察料金を登録しました。');
          this.$state.go('app.dashboard.inspection', {}, {reload: true});
        });
    }

    // 診察料金を更新する
    update(inspection) {
      this.ClinicInspection.update({clinicId: this.clinic.id, inspectionId: inspection.id}, inspection).$promise
        .then(() => {
          this.toaster.info('診察料金を更新しました。');
          this.$state.go('app.dashboard.inspection', {}, {reload: true});
        });
    }
  }

  InspectionFormController.$inject = ['$state', 'toaster', 'ClinicInspection', 'clinic', 'inspection', 'inspections'];
  angular.module('petzApp')
    .controller('InspectionFormController', InspectionFormController);

})();
