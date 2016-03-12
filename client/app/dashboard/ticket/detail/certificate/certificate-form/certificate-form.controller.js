(() => {
  'use strict';

  class TicketDetailCertificateFormController {
    constructor($state, toaster, ClinicTicketCertificate, vaccines, clinic, ticket, certificate) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicTicketCertificate = ClinicTicketCertificate;
      this.vaccines = vaccines;
      this.clinic = clinic;
      this.ticket = ticket;
      this.certificate = certificate;
      this.certificate.vaccinatedDate = new Date();
    }

    // 予防接種情報を保存する
    save(certificate) {
      certificate.type = 'PREVENTION';
      certificate.ticket = this.ticket;
      this.ClinicTicketCertificate.save({clinicId: this.clinic.id, ticketId: this.ticket.id}, certificate).$promise
        .then(() => {
          this.toaster.info('新しく予防接種の証明書を発行しました。');
          this.$state.go('app.dashboard.ticket.detail.certificate.list');
        });
    }
  }

  TicketDetailCertificateFormController.$inject = ['$state', 'toaster', 'ClinicTicketCertificate', 'vaccines', 'clinic', 'ticket', 'certificate'];
  angular.module('petzApp')
    .controller('TicketDetailCertificateFormController', TicketDetailCertificateFormController);

})();
