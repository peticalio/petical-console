(() => {
  'use strict';

  function resetRouteConfig($stateProvider){
    $stateProvider
      .state('app.reset', {
        url: '/reset',
        views: {
          '@app': {
            templateUrl:      'app/reset/reset.html',
            controller:       'ResetController',
            controllerAs:     'ctrl'
          }
        }
      })
      .state('app.reset.password', {
        url: '/password',
        views: {
          '@app': {
            templateUrl:      'app/reset/password/password.html',
            controller:       'ResetPasswordController',
            controllerAs:     'ctrl'
          }
        }
      })
      .state('app.reset.finish', {
        url: '/finish',
        views: {
          '@app': {
            templateUrl:      'app/reset/finish/finish.html',
            controller:       'ResetFinishController',
            controllerAs:     'ctrl'
          }
        }
      })
    ;
  }

  resetRouteConfig.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(resetRouteConfig);
})();
