(() => {
  'use strict';

  class StaffFormController {
    constructor($state, toaster, ClinicInvitation, clinic) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicInvitation = ClinicInvitation;
      this.clinic = clinic;
    }

    invite(invitation) {
      invitation.emails = invitation.email.split(',');
      this.ClinicInvitation.save({clinicId:this.clinic.id}, invitation).$promise
        .then(() => {
          this.toaster.info('ご指定のメールアドレスに招待状を送信しました。');
          this.$state.go('app.dashboard.staff', {clinicId:this.clinic.id}, {reload:true});
        });
    }
  }

  StaffFormController.$inject = ['$state', 'toaster', 'ClinicInvitation', 'clinic'];
  angular.module('petzApp')
    .controller('StaffFormController', StaffFormController);

})();
