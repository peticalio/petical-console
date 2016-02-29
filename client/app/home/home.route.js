(() => {
  'use strict';

  // function getClinics(Auth, MyClinic) {
  //   console.log('call');
  //   // if (Auth.isLoggedIn()) {
  //     return MyClinic.query().$promise
  //       .then(function(response) {
  //         return response;
  //       });
  //   // }
  //   // return [];
  // }
  //
  // function getPets(Auth, MyPet) {
  //   console.log('call');
  //   if (Auth.isLoggedIn()) {
  //     return MyPet.query().$promise
  //       .then(function(response) {
  //         return response;
  //       });
  //   }
  //   return [];
  // }
  //
  // function getInvitations(Auth, MyInvitation) {
  //   if (Auth.isLoggedIn()) {
  //     return MyInvitation.query().$promise
  //       .then(function(response) {
  //         return response;
  //       });
  //   }
  //   return [];
  // }

  function HomeRouter($stateProvider){
    $stateProvider
      .state('app.home', {
        url: '^/',
        views: {
          '@app': {
            templateUrl:  'app/home/home.html',
            controller:   'HomeController',
            controllerAs: 'ctrl'
          }
        // },
        // resolve: {
        //   clinics:        getClinics,
        //   pets:           function() {return [];},
        //   invitations:    function() {return [];}
        }
      })
    ;
  }

  HomeRouter.$inject = ['$stateProvider'];
  angular.module('petzApp').config(HomeRouter);

})();
