(() => {
  'use strict';

  class StaffDetailController {
    constructor($state, dialog, toaster, ClinicStaff, clinic, staff) {
      this.$state = $state;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicStaff = ClinicStaff;
      this.clinic = clinic;
      this.staff = staff;
    }

    delete(event, staff) {
      this.dialog.delete(event, staff)
        .then(() => this.ClinicStaff.delete({clinicId: this.clinic.id, staffId: staff.id}))
        .then(() => this.ClinicStaff.fetch({clinicId: this.clinic.id}))
        .then(() => {
          this.toaster.info('スタッフを削除しました。');
          this.$state.go('app.dashboard.staff.list');
        });
    }
  }

  StaffDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicStaff', 'clinic', 'product'];
  angular.module('petzApp')
    .controller('ProductDetailController', StaffDetailController);

})();
