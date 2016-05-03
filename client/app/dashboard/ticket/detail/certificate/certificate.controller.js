(() => {
  'use strict';

  class TicketDetailCertificateController {
    constructor($state, $stateParams, toaster, ClinicTicketCertificate, clinic, ticket, certificates) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicTicketCertificate = ClinicTicketCertificate;
      this.clinic = clinic;
      this.ticket = ticket;
      this.certificates = certificates;
    }

    refresh() {
      this.ClinicTicketCertificate.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise
        .then((response) => {
          this.toaster.info('証明書の一覧を更新しました。');
          this.certificates = response;
        });
    }
  }

  TicketDetailCertificateController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicTicketCertificate', 'clinic', 'ticket', 'certificates'];
  angular.module('petzApp')
    .controller('TicketDetailCertificateController', TicketDetailCertificateController);

})();
