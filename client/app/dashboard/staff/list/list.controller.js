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

// angular.module('petzApp')
//   .controller('ClinicDetailStaffInvitationModalController', function ($scope, $stateParams, $modalInstance, Notify, ClinicInvitation) {
//     var _this = this;
//
//     _this.closeInvitaionDialog = function() {
//       $modalInstance.dismiss('cancel');
//     };
//
//     _this.invite = function() {
//       var email = $scope.invitation.email;
//       var invitation = new ClinicInvitation({clinicId: $stateParams.clinicId});
//       invitation.emails = email.split(',');
//       invitation.$save(function() {
//         $modalInstance.dismiss('cancel');
//         Notify.success('ご指定のメールアドレスに招待状を送信しました。');
//       });
//     }
//   });
