(() => {
  'use strict';

  function MainRouter($stateProvider){
    $stateProvider
      .state('app', {
        abstract:         true,
        templateUrl:      'app/main/main.html',
        controller:       'MainController',
        controllerAs:     'ctrl'
      })
    ;
  }

  MainRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(MainRouter);

})();
