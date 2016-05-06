(() => {
  'use strict';

  class MainController {
    constructor($state, clinics, pets, Auth) {
      this.state = $state;
      this.clinics = clinics;
      this.pets = pets;
      this.account = Auth.getCurrentUser();
    }
  }

  MainController.$inject = ['$state', 'clinics', 'pets', 'Auth'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
