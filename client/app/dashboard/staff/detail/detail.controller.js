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
        .then(() => {
          this.toaster.info('スタッフを削除しました。');
          this.$state.go('app.dashboard.staff', {}, {reload: true});
        });
    }
  }

  StaffDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicStaff', 'clinic', 'staff'];
  angular.module('petzApp')
    .controller('StaffDetailController', StaffDetailController);

})();
