'use strict';

angular.module('petz.api')
  .factory('MyInvitation', ['resource',
    function (resource) {
      return resource('/api/v1/me/invitations/:invitationId');
    }
  ]);
