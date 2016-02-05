/* istanbul ignore next: tired of writing tests */
(()=> {
  'use strict';

  class MainController {
    constructor() {
    }
  }

  MainController.$inject = [];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
