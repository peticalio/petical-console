(() => {
  'use strict';

  class StaffListController {
    constructor($state, toaster, ClinicStaff, clinic, staffs) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicStaff = ClinicStaff;
      this.clinic = clinic;
      this.staffs = staffs;
    }

    // スタッフを取得する
    refresh() {
      this.ClinicStaff.fetch({clinicId: this.clinic.id}).$promise
        .then((response) => {
          this.staffs = response;
          this.toaster.info('スタッフの一覧を更新しました。');
        });
    }
  }

  StaffListController.$inject = ['$state', 'toaster', 'ClinicStaff', 'clinic', 'staffs'];
  angular.module('petzApp')
    .controller('StaffListController', StaffListController);

})();
