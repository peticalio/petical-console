(() => {
  'use strict';

  class MainController {
    constructor($state, clinics, pets) {
      this.state = $state;
      this.clinics = clinics;
      this.pets = pets;
    }
  }

  MainController.$inject = ['$state', 'clinics', 'pets'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
