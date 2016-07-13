'use strict';

angular.module('petz.core')
  .directive('ptzStateLoadingIndicator', ['$rootScope', function($rootScope) {
    var template =
      '<div ng-show="isStateLoading" class="ptc-spinner-container">' +
      '<div class="ptc-spinner-cell">' +
      '<ul class="ptc-spinner">' +
	    '<li></li>' +
	    '<li></li>' +
	    '<li></li>' +
	    '<li></li>' +
      '</ul>' +
      '</div>' +
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
