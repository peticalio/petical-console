(() => {
  'use strict';

  class TicketDetailExaminationController {
    constructor($state, toaster, ClinicTicketExamination, ClinicTicketInvoice, clinic, ticket, examinations) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicTicketExamination = ClinicTicketExamination;
      this.ClinicTicketInvoice = ClinicTicketInvoice;
      this.clinic = clinic;
      this.ticket = ticket;
      this.examinations = examinations;
    }

    // 一覧を更新する
    refresh() {
      this.ClinicTicketExamination.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise
        .then((response) => {
          this.toaster.info('診察内容の一覧を更新しました。');
          this.examinations = response;
        });
    }

    // 請求書を作成する
    createInvoice(ticket) {
      this.ClinicTicketInvoice.save({clinicId: this.clinic.id, ticketId: ticket.id}, {}).$promise
        .then(() => {
          this.toaster.info('診察を終了し、請求書を作成しました。');
          this.$state.go('app.dashboard.ticket.detail.invoice.list');
        });
    }
  }

  TicketDetailExaminationController.$inject = ['$state', 'toaster', 'ClinicTicketExamination', 'ClinicTicketInvoice', 'clinic', 'ticket', 'examinations'];
  angular.module('petzApp')
    .controller('TicketDetailExaminationController', TicketDetailExaminationController);

})();
