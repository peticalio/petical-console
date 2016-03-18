(() => {
  'use strict';

  class MainController {
    constructor($state, MyClinic, MyPet, MyInvitation) {
      this.state = $state;
      MyClinic.query().$promise.then((response) => {
        this.clinics = response;
      });
      MyPet.query().$promise.then((response) => {
        this.pets = response;
      });
      MyInvitation.query().$promise.then((response) => {
        this.invitations = response;
      });
    }
  }

  MainController.$inject = ['$state', 'MyClinic', 'MyPet', 'MyInvitation'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
