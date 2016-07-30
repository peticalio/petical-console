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
        ncyBreadcrumb: {
          label: 'ホーム'
        }
      })
    ;
  }

  MainRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(MainRouter);

})();
