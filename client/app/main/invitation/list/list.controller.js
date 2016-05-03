(()=> {
  'use strict';

  class InvitationListController {
    constructor($state, $stateParams, toaster, MyInvitation, invitations) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.MyInvitation = MyInvitation;
      this.invitations = invitations;
    }

    // 一覧を更新する
    refresh() {
      this.MyInvitation.fetch().$promise
        .then((response) => {
          this.toaster.info('招待状の一覧を更新しました。');
          this.invitations = response;
        });
    }
  }

  InvitationListController.$inject = ['$state', '$stateParams', 'toaster', 'MyInvitation', 'invitations'];
  angular.module('petzApp')
    .controller('InvitationListController', InvitationListController);

})();
