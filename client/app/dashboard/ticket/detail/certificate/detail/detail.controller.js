(() => {
  'use strict';

  class TicketDetailCertificateDetailController {
    constructor($state, $stateParams, clinic, certificate) {
      this.clinic = clinic;
      this.certificate = certificate;

      var date = certificate.vaccinatedDate;
      this.nextVaccinatedDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
    }
  }

  TicketDetailCertificateDetailController.$inject = ['$state', '$stateParams', 'clinic', 'certificate'];
  angular.module('petzApp')
    .controller('TicketDetailCertificateDetailController', TicketDetailCertificateDetailController);

})();
