(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('StaffFormController', StaffFormController);

  StaffFormController.$inject = ['$state', '$stateParams', 'Notify', 'ClinicInvitation'];
  function StaffFormController($state, $stateParams, Notify, ClinicInvitation) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.invite = invite;
    }

    function invite(form) {
      var email = form.email;
      var invitation = new ClinicInvitation({clinicId: $stateParams.clinicId});
      invitation.emails = email.split(',');
      invitation.$save(function() {
        Notify.success('ご指定のメールアドレスに招待状を送信しました。');
        $state.go('app.dashboard.staff', {clinicId: $stateParams.clinicId});
      });
    }

    constructor();
  }
})();
