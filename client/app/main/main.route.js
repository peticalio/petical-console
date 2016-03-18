(() => {
  'use strict';

  function MainRouter($stateProvider){
    $stateProvider
      .state('app.main', {
        url:              '^/',
        views: {
          '@app': {
            templateUrl:  'app/main/main.html',
            controller:   'MainController',
            controllerAs: 'ctrl'
          }
        },
      })
    ;
  }

  MainRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(MainRouter);

})();
