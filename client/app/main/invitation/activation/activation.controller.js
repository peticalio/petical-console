(()=> {
  'use strict';

  class InvitationActivationController {
    constructor($state, $stateParams, toaster, MyInvitation) {
      this.state = $state;
      this.params = $stateParams;
      this.toaster = toaster;
      this.MyInvitation = MyInvitation;
    }

    // クリニックへの招待を承認する
    accept(activation) {
      this.MyInvitation.save({invitationId:this.params.invitationId}, activation).$promise
        .then(() => {
          this.toaster.info('招待をアクティベートしました。');
          this.state.go('app.main', {}, {reload:true});
        });
    }
  }

  InvitationActivationController.$inject = ['$state', '$stateParams', 'toaster', 'MyInvitation'];
  angular.module('petzApp')
    .controller('InvitationActivationController', InvitationActivationController);

})();
