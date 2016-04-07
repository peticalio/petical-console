(() => {
  'use strict';

  function getInvitations(MyInvitation) {
    return MyInvitation.query().$promise
      .then((response) => response);
  }
  function getInvitation($stateParams, MyInvitation) {
    return MyInvitation.load({invitationId: $stateParams.invitationId}).$promise
      .then((response) => response);
  }

  function InvitationRouter($stateProvider){
    $stateProvider
      .state('app.main.invitation', {
        abstract:         true,
        url:              '^/invitations',
      })
      .state('app.main.invitation.list', {
        url:              '/list',
        views: {
          '@app': {
            templateUrl:  'app/main/invitation/list/list.html',
            controller:   'InvitationListController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          invitations:     getInvitations
        }
      })
      .state('app.main.invitation.activation', {
        url:              '/:invitationId/activation',
        views: {
          '@app': {
            templateUrl:  'app/main/invitation/activation/activation.html',
            controller:   'InvitationActivationController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          invitation:     getInvitation
        }
      })
    ;
  }

  InvitationRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(InvitationRouter);

})();
