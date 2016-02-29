(() => {
  'use strict';

  function empty() {
    return {country:'JP'};
  }

  function getInvitation($stateParams, MyInvitation) {
    return MyInvitation.load({invitationId:$stateParams.invitationId}).$promise
      .then(function(response) {
        return response;
      });
  }

  function ClinicRouter($stateProvider){
    $stateProvider
      // register new clinic
      .state('app.clinic', {
        abstract:         true
      })
      .state('app.clinic.form', {
        authenticate:     true,
        url:              '^/clinics/form',
        views: {
          '@app': {
            templateUrl:  'app/clinic/form/form.html',
            controller:   'ClinicFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          clinic:         empty
        }
      })
      .state('app.clinic.invitation', {
        authenticate:     true,
        url:              '^/invitations/:invitationId',
        views: {
          '@app': {
            templateUrl:  'app/clinic/invitation/invitation.html',
            controller:   'ClinicInvitationController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          invitation:     getInvitation
        }
      })
    ;
  }

  ClinicRouter.$inject = ['$stateProvider'];
  angular.module('petzApp').config(ClinicRouter);

})();
