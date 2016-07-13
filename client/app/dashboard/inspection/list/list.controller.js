(() => {
  'use strict';

  class InspectionListController {
    constructor($state, toaster, ClinicInspection, clinic, inspections) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicInspection = ClinicInspection;
      this.clinic = clinic;
      this.inspections = inspections;
      this.order = 'lastModifiedDate';
      this.reverse = false;
    }

    // 商品マスタをリフレッシュする
    refresh() {
      this.ClinicInspection.fetch({clinicId: this.clinic.id}).$promise
        .then((response) => {
          this.inspections = response;
          this.toaster.info('診察料金の一覧を更新しました。');
        });
    }

    // ソートキーを指定する
    sort(key) {
      this.order = key;
      this.reverse = !this.reverse;
    }
  }

  InspectionListController.$inject = ['$state', 'toaster', 'ClinicInspection', 'clinic', 'inspections'];
  angular.module('petzApp')
    .controller('InspectionListController', InspectionListController);

})();
