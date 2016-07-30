(() => {
  'use strict';

  class MainController {
    constructor($state, Auth, MyClinic) {
      this.state = $state;
      this.account = Auth.getCurrentUser();
      MyClinic.query().$promise.then((response) => this.clinics = response);
    }
  }

  MainController.$inject = ['$state', 'Auth', 'MyClinic'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
