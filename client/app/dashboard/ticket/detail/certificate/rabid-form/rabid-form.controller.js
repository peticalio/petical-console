(() => {
  'use strict';

  class TicketDetailCertificateRabidFormController {
    constructor($state, toaster, ClinicTicketCertificate, clinic, ticket, certificate) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicTicketCertificate = ClinicTicketCertificate;
      this.clinic = clinic;
      this.ticket = ticket;
      this.certificate = certificate;
      this.certificate.vaccinatedDate = new Date();
    }

    // 狂犬病予防接種情報を保存する
    save(certificate) {
      certificate.type = 'RABID';
      certificate.ticket = this.ticket;
      this.ClinicTicketCertificate.save({clinicId: this.clinic.id, ticketId: this.ticket.id}, certificate).$promise
        .then(() => {
          this.toaster.info('新しく狂犬病予防注射済証を発行しました。');
          this.$state.go('app.dashboard.ticket.detail.certificate.list', {clinicId: this.clinic.id, ticketId: this.ticket.id});
        });
    }
  }

  TicketDetailCertificateRabidFormController.$inject = ['$state', 'toaster', 'ClinicTicketCertificate', 'clinic', 'ticket', 'certificate'];
  angular.module('petzApp')
    .controller('TicketDetailCertificateRabidFormController', TicketDetailCertificateRabidFormController);

})();
