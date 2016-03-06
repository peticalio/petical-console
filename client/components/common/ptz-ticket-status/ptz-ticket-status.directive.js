'use strict';

angular.module('petzApp')
  .directive('ptzTicketStatus', function () {
    return {
      templateUrl: 'components/common/ptz-ticket-status/ptz-ticket-status.html',
      restrict: 'EA',
      replace: true,
      scope: {
        status: '='
      },
      link: function() {
      }
    };
  });
