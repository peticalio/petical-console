'use strict';

angular.module('petz.api')
  .factory('ClinicInvitation', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/invitations/:invitationId', {});
    }
  ]);
