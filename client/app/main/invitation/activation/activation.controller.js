(()=> {
  'use strict';

  class InvitationActivationController {
    constructor($state, $stateParams, toaster, MyInvitation, MyClinic) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.MyInvitation = MyInvitation;
      this.MyClinic = MyClinic;
    }

    // クリニックへの招待を承認する
    accept(activation) {
      this.MyInvitation.save({invitationId:this.$stateParams.invitationId}, activation).$promise
        .then(() => this.MyClinic.clear().$promise)
        .then(() => {
          this.toaster.info('招待をアクティベートしました。');
          this.$state.go('app.main');
        });
    }
  }

  InvitationActivationController.$inject = ['$state', '$stateParams', 'toaster', 'MyInvitation', 'MyClinic'];
  angular.module('petzApp')
    .controller('InvitationActivationController', InvitationActivationController);

})();
