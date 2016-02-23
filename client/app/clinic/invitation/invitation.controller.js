(()=> {
  'use strict';

  class ClinicInvitationController {
    constructor($state, $stateParams, toaster, MyInvitation) {
      this.state = $state;
      this.params = $stateParams;
      this.toaster = toaster;
      this.MyInvitation = MyInvitation;
    }

    // クリニックへの招待を承認する
    accept(activation) {
      this.MyInvitation.save({invitationId: this.params.invitationId}, activation).$promise
        .then(() => {
          this.toaster.info('招待状を承認して、勤務先のクリニックに追加しました。');
          this.state.go('app.home');
        });
    }
  }

  ClinicInvitationController.$inject = ['$state', '$stateParams', 'toaster', 'MyInvitation'];
  angular.module('petzApp')
    .controller('ClinicInvitationController', ClinicInvitationController);

})();
