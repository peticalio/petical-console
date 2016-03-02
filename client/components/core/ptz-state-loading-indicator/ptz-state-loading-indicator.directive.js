'use strict';

angular.module('petz.core')
  .directive('ptzStateLoadingIndicator', ['$rootScope', function($rootScope) {
    var template = '<div ng-show="isStateLoading" layout="row" layout-align="center center" class="state-loading-indicator"><md-progress-circular md-mode="indeterminate" md-theme="progress" md-diameter="120"></md-progress-circular></div>';

    return {
      restrict: 'E',
      template: template,
      replace: true,
      link: function(scope) {
        scope.isStateLoading = false;
        $rootScope.$on('$stateChangeStart', function() {
          scope.isStateLoading = true;
        });
        $rootScope.$on('$stateChangeSuccess', function() {
          scope.isStateLoading = false;
        });
      }
    };
  }]);
