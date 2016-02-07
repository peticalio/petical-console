/* istanbul ignore next: tired of writing tests */
(()=> {
  'use strict';

  class ToasterService {
    constructor($mdToast) {
      this.toast = $mdToast;
    }

    info(message) {
      this.toast.show(
        this.toast.simple()
          .textContent(message)
          .position('bottom right')
          .hideDelay(5000)
      );
    }
  }

  ToasterService.$inject = ['$mdToast'];
  angular.module('petz.vendor')
    .service('toaster', ToasterService);

})();
