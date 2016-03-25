(() => {
  'use strict';

  class TicketDetailInvoiceDetailPaymentController {
    constructor($state, $mdDialog, ClinicInvoicePayment, clinic, ticket, invoice) {
      this.$state = $state;
      this.$mdDialog = $mdDialog;
      this.ClinicInvoicePayment = ClinicInvoicePayment;
      this.clinic = clinic;
      this.ticket = ticket;
      this.invoice = invoice;
      this.paymentTypes = [
        {name: '現金', value: 'CASH'},
        {name: 'クレジットカード', value: 'CREDIT_CARD'},
        {name: 'その他', value: 'OTHER'}
      ];
    }

    close() {
      this.$mdDialog.cancel();
    }

    save(payment) {
      payment.invoice = this.invoice;
      this.ClinicInvoicePayment.save({clinicId: this.clinic.id, invoiceId: this.invoice.id}, payment).$promise
        .then((response) => this.$mdDialog.hide(response));
    }
  }

  TicketDetailInvoiceDetailPaymentController.$inject = ['$state', '$mdDialog', 'ClinicInvoicePayment', 'clinic', 'ticket', 'invoice'];
  angular.module('petzApp')
    .controller('TicketDetailInvoiceDetailPaymentController', TicketDetailInvoiceDetailPaymentController);

})();
