'use strict';

angular.module('petz.core')
  .directive('ptzStateLoadingIndicator', ['$rootScope', function($rootScope) {
    var template = '<div ng-show="isStateLoading" class="state-loading-indicator">'
      + '<div class="state-loading-indicator-body">'
      + '<h3 class="state-loading-title">Loading...</h3>'
      + '<div class="spinner"></div>'
      + '</div>'
      + '</div>';

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
