(() => {
  'use strict';

  class TicketDetailExaminationDetailController {
    constructor($state, toaster, dialog, ClinicTicketExamination, clinic, ticket, examination) {
      this.$state = $state;
      this.toaster = toaster;
      this.dialog = dialog;
      this.ClinicTicketExamination = ClinicTicketExamination;
      this.clinic = clinic;
      this.ticket = ticket;
      this.examination = examination;
    }

    delete(event, examination) {
      this.dialog.delete(event, examination)
        .then(() => this.ClinicTicketExamination.remove({clinicId: this.clinic.id, ticketId: this.ticket.id, examinationId: examination.id}).$promise)
        .then(() => this.ClinicTicketExamination.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise)
        .then(() => {
          this.toaster.info('診察内容を削除しました。');
          this.$state.go('app.dashboard.ticket.detail.examination.list');
        });
    }
  }

  TicketDetailExaminationDetailController.$inject = ['$state', 'toaster', 'dialog', 'ClinicTicketExamination', 'clinic', 'ticket', 'examination'];
  angular.module('petzApp')
    .controller('TicketDetailExaminationDetailController', TicketDetailExaminationDetailController);

})();
