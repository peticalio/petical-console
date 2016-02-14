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
    ;
  }

  routesConfig.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(routesConfig);
})();
