'use strict';

angular.module('petz.core')
  .directive('uiSrefIgnore', function() {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        elem.on('click', function() {
          // Find the ui sref parent
          var uiSref = elem.parents('[ui-sref]').first();
          // Set the target attribute so that the click event is ignored
          uiSref.attr({
            target: 'true'
          });
          // Function to remove the target attribute pushed to the bottom
          // of the event loop. This allows for a digest cycle to be run
          // and the uiSref element will be evaluated while the attribute
          // is populated
          setTimeout(function() {
            uiSref.attr({
              target: null
            });
          }, 0);
        });
      }
    };
  });
