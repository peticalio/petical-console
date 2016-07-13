(() => {
  'use strict';

  class TicketDetailInvoiceDetailController {
    constructor($state, dialog, toaster, ClinicTicketInvoice, ClinicInvoice, clinic, ticket, invoice, examinations) {
      this.$state = $state;
      this.dialog = dialog;
      this.toaster = toaster;
      this.ClinicTicketInvoice = ClinicTicketInvoice;
      this.ClinicInvoice = ClinicInvoice;
      this.clinic = clinic;
      this.ticket = ticket;
      this.invoice = invoice;
      this.examinations = examinations;
    }

    // 請求書をキャンセルする
    cancel(event, invoice) {
      this.dialog.delete(event, invoice)
        .then(() => this.ClinicInvoice.remove({clinicId: this.clinic.id, invoiceId: this.invoice.id}).$promise)
        .then(() => this.ClinicTicketInvoice.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise)
        .then(() => {
          this.toaster.info('請求をキャンセルしました。');
          this.$state.go('app.dashboard.ticket.detail.invoice.list');
        });
    }

    // 支払モーダルを表示する
    showPaymentModal(event, invoice) {
      var options = {
        controller: 'TicketDetailInvoiceDetailPaymentController',
        controllerAs: 'ctrl',
        templateUrl: 'app/dashboard/ticket/detail/invoice/detail/payment/payment.html',
        targetEvent: event,
        locals: {clinic: this.clinic, ticket: this.ticket, invoice: invoice}
      };
      this.dialog.show(options)
        .then(() => this.ClinicInvoice.get({clinicId: this.clinic.id, invoiceId: this.invoice.id}).$promise)
        .then((response) => {
          this.invoice = response;
          this.toaster.info('お客様のお支払い情報を登録しました。');
        });
    }
  }

  TicketDetailInvoiceDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicTicketInvoice', 'ClinicInvoice', 'clinic', 'ticket', 'invoice', 'examinations'];
  angular.module('petzApp')
    .controller('TicketDetailInvoiceDetailController', TicketDetailInvoiceDetailController);

})();
