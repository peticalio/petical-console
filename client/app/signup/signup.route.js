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
      .state('app.signup.thanks', {
        url: '/thanks',
        views: {
          '@app': {
            templateUrl:      'app/signup/thanks/thanks.html',
            controller:       'SignupThanksController',
            controllerAs:     'ctrl'
          }
        }
      })
      .state('app.signup.activate', {
        url: '/activate:param',
        views: {
          '@app': {
            templateUrl:      'app/signup/activate/activate.html',
            controller:       'SignupActivateController',
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
