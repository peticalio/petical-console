(() => {
  'use strict';

  function AppRouter($stateProvider){
    $stateProvider
      .state('app', {
        abstract:         true,
        templateUrl:      'app/app.html',
        controller:       'AppController',
        controllerAs:     'ctrl'
      })
    ;
  }

  AppRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(AppRouter);

})();
