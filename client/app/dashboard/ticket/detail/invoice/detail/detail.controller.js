(() => {
  'use strict';

  function TicketDetailInvoiceDetailPaymentController($mdDialog) {
    this.$mdDialog = $mdDialog;
    console.log('call');
  }

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
    pay(event, invoice) {
      var options = {
        controller: TicketDetailInvoiceDetailPaymentController,
        controllerAs: 'ctrl',
        templateUrl: 'payment/payment.html',
        targetEvent: event
      };
      this.dialog.show(event, options)
        .then(() => this.ClinicInvoicePayment.save({clinicId: this.clinic.id, invoiceId: this.invoice.id}, invoice).$promise)
        .then(() => this.ClinicInvoice.get({clinicId: this.clinic.id, invoiceId: this.invoice.id}).$promise)
        .then(() => this.toaster.info('支払情報を登録しました。'));
    }
  }

  TicketDetailInvoiceDetailController.$inject = ['$state', 'dialog', 'toaster', 'ClinicTicketInvoice', 'ClinicInvoice', 'clinic', 'ticket', 'invoice', 'examinations'];
  angular.module('petzApp')
    .controller('TicketDetailInvoiceDetailController', TicketDetailInvoiceDetailController);

})();
