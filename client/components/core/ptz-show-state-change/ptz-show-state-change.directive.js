'use strict';

angular.module('petz.core')
  .directive('ptzShowStateChange', function() {
    return {
      restrict: 'EA',
      link: function(scope, element) {
        // Store original display mode of element
        var hideElement = function() {
          element.addClass('ng-hide');
          // element.css('display', 'none');
        };
        var showElement = function() {
          element.removeClass('ng-hide');
          // element.css('display', element.css('display'));
        };

        scope.$on('$stateChangeStart', showElement);
        scope.$on('$destroy', hideElement);

        // Initially element is hidden
        hideElement();
      }
    };
  });
