(() => {
  'use strict';

  class TicketInvoiceController {
    constructor($state, clinic, ticket, accounts, payments) {
      this.$state = $state;
      this.clinic = clinic;
      this.ticket = ticket;
      this.accounts = accounts;
      this.payments = payments;
      this.today = new Date();
    }
  }

  TicketInvoiceController.$inject = ['$state', 'clinic', 'ticket', 'accounts', 'payments'];
  angular.module('petzApp')
    .controller('TicketInvoiceController', TicketInvoiceController);

})();
