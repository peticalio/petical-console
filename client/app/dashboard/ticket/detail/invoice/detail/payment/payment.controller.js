(() => {
  'use strict';

  class TicketDetailInvoiceDetailPaymentController {
    constructor($state, $mdDialog, clinic, ticket, invoice) {
      this.$state = $state;
      this.$mdDialog = $mdDialog;
      this.clinic = clinic;
      this.ticket = ticket;
      this.invoice = invoice;
      console.log(invoice);
      this.paymentTypes = [{name: '現金', value: 'CASH'}, {name: 'クレジットカード', value: 'CREDIT_CARD'}, {name: 'その他', value: 'OTHER'}];
    }

    close() {
      this.$mdDialog.cancel();
    }
  }

  TicketDetailInvoiceDetailPaymentController.$inject = ['$state', '$mdDialog', 'clinic', 'ticket', 'invoice'];
  angular.module('petzApp')
    .controller('TicketDetailInvoiceDetailPaymentController', TicketDetailInvoiceDetailPaymentController);

})();
