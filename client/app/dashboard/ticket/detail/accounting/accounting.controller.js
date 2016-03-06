(() => {
  'use strict';

  class TicketDetailAccountingController {
    constructor($state, $stateParams, toaster, ClinicTicketInvoice, ClinicInvoicePayment, clinic, ticket, invoices) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicTicketInvoice = ClinicTicketInvoice;
      this.ClinicInvoicePayment = ClinicInvoicePayment;
      this.clinic = clinic;
      this.ticket = ticket;
      this.invoices = invoices;
    }

    refresh() {
      this.ClinicTicketInvoice.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise
        .then((response) => {
          this.toaster.info('請求書の一覧を更新しました。');
          this.invoices = response;
        });
    }

    // 支払情報を保存する
    save(payment) {
      this.ClinicInvoicePayment.save({clinicId: this.clinic.id, ticketId: this.ticket.id, invoiceId: this.invoice.id}, payment).$promise
        .then(() => {
          this.toaster.info('支払情報を登録しました。');
        });
    }

    // おつりを計算する
    calculateChange() {
      var total = this.invoice.total;
      var amount = this.payment.amount;
      this.payment.changed = -(total - amount);
    }
  }

  TicketDetailAccountingController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicTicketInvoice', 'ClinicInvoicePayment', 'clinic', 'ticket', 'invoices'];
  angular.module('petzApp')
    .controller('TicketDetailAccountingController', TicketDetailAccountingController);

})();
