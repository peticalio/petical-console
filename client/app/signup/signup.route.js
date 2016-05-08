(() => {
  'use strict';

  function routesConfig($stateProvider){
    $stateProvider
      .state('app.signup', {
        url: '/signup',
        views: {
          '@app': {
            templateUrl:      'app/signup/signup.html',
            controller:       'SignupController',
            controllerAs:     'ctrl'
          }
        }
      })
      .state('app.activate', {
        url: '/activate',
        views: {
          '@app': {
            templateUrl:      'app/signup/finish/finish.html',
            controller:       'SignupFinishController',
            controllerAs:     'ctrl'
          }
        }
      })
    ;
  }

  routesConfig.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(routesConfig);
})();
