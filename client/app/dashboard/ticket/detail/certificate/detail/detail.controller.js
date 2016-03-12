(() => {
  'use strict';

  class TicketDetailCertificateDetailController {
    constructor($state, toaster, dialog, ClinicTicketCertificate, clinic, ticket, certificate) {
      this.$state = $state;
      this.toaster = toaster;
      this.dialog = dialog;
      this.ClinicTicketCertificate = ClinicTicketCertificate;
      this.clinic = clinic;
      this.ticket = ticket;
      this.certificate = certificate;

      var date = certificate.vaccinatedDate;
      this.nextVaccinatedDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
    }

    delete(event, certificate) {
      this.dialog.delete(event, certificate)
        .then(() => this.ClinicTicketCertificate.remove({clinicId: this.clinic.id, ticketId: this.ticket.id, certificateId: certificate.id}).$promise)
        .then(() => this.ClinicTicketCertificate.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise)
        .then(() => {
          this.toaster.info('予防接種等の証明書を削除しました。');
          this.$state.go('app.dashboard.ticket.detail.certificate.list');
        });
    }
  }

  TicketDetailCertificateDetailController.$inject = ['$state', 'toaster', 'dialog', 'ClinicTicketCertificate', 'clinic', 'ticket', 'certificate'];
  angular.module('petzApp')
    .controller('TicketDetailCertificateDetailController', TicketDetailCertificateDetailController);

})();
