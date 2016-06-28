'use strict';

angular.module('petz.core')
  .directive('ptzStateLoadingIndicator', ['$rootScope', function($rootScope) {
    var template =
      '<div ng-show="isStateLoading" layout="row" layout-align="center center" class="state-loading-indicator">' +
      '<i class="fa fa-repeat fa-spin fa-4x fa-fw text-primary"></i>' +
      '</div>';

    return {
      restrict: 'E',
      template: template,
      replace: true,
      link: function(scope) {
        var view = function() {
          scope.isStateLoading = true;
        };
        var hide = function() {
          scope.isStateLoading = false;
        };

        scope.isStateLoading = false;
        $rootScope.$on('$stateChangeStart', view);
        $rootScope.$on('$stateChangeSuccess', hide);
        $rootScope.$on('$stateChangeError', hide);
      }
    };
  }]);
