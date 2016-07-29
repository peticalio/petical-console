(() => {
  'use strict';

  class StaffListController {
    constructor($state, toaster, ClinicStaff, clinic, staffs) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicStaff = ClinicStaff;
      this.clinic = clinic;
      this.staffs = staffs;
      this.order = 'lastModifiedDate';
      this.reverse = false;
    }

    // スタッフを取得する
    refresh() {
      this.ClinicStaff.fetch({clinicId: this.clinic.id}).$promise
        .then((response) => {
          this.staffs = response;
          this.toaster.info('スタッフの一覧を更新しました。');
        });
    }

    // ソートキーを指定する
    sort(key) {
      this.order = key;
      this.reverse = !this.reverse;
    }
  }

  StaffListController.$inject = ['$state', 'toaster', 'ClinicStaff', 'clinic', 'staffs'];
  angular.module('petzApp')
    .controller('StaffListController', StaffListController);

})();
