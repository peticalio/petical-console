(() => {
  'use strict';

  // 自分が所属するクリニックを取得する
  function getMyClinics(MyClinic) {
    return MyClinic.query().$promise
      .then((response) => response);
  }
  // 自分が飼育するペットを取得する
  function getMyPets(MyPet) {
    return MyPet.query().$promise
      .then((response) => response);
  }

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
        resolve: {
          clinics:        getMyClinics,
          pets:           getMyPets
        }
      })
    ;
  }

  MainRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(MainRouter);

})();
