(() => {
  'use strict';

  function routesConfig($stateProvider){
    $stateProvider
      .state('app.signin', {
        url: '/signin',
        views: {
          '@app': {
            templateUrl:      'app/signin/signin.html',
            controller:       'SigninController',
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
