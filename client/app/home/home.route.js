(function() {
  'use strict';

  angular
    .module('petzApp')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  function routesConfig($stateProvider, $locationProvider, $urlRouterProvider){
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

  function getClinics(Auth, MyClinic) {
    console.log('call');
    // if (Auth.isLoggedIn()) {
      return MyClinic.query().$promise
        .then(function(response) {
          return response;
        });
    // }
    // return [];
  }

  function getPets(Auth, MyPet) {
    console.log('call');
    if (Auth.isLoggedIn()) {
      return MyPet.query().$promise
        .then(function(response) {
          return response;
        });
    }
    return [];
  }

  function getInvitations(Auth, MyInvitation) {
    if (Auth.isLoggedIn()) {
      return MyInvitation.query().$promise
        .then(function(response) {
          return response;
        });
    }
    return [];
  }

})();
