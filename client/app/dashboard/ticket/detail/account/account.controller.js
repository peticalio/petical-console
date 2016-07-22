(() => {
  'use strict';

  class TicketAccountListController {
    constructor($state, toaster, ClinicTicket, TicketAccount, clinic, ticket, accounts) {
      this.$state = $state;
      this.toaster = toaster;
      this.clinic = clinic;
      this.ticket = ClinicTicket.get({clinicId:clinic.id, ticketId:ticket.id});
      this.ClinicTicket = ClinicTicket;
      this.TicketAccount = TicketAccount;
      this.accounts = accounts;
    }

    // 支払情報を保存する
    save() {
      // this.ClinicInvoicePayment.save({clinicId: this.clinic.id, ticketId: this.ticket.id, invoiceId: this.invoice.id}, payment).$promise
      //   .then(() => {
      //     this.toaster.info('支払情報を登録しました。');
      //   });
    }

    // 再計算する
    calculate() {
      this.TicketAccount.fetch({clinicId:this.clinic.id, ticketId:this.ticket.id, force:true}).$promise
        .then((response) => {
          this.accounts = response;
          return this.ClinicTicket.get({clinicId:this.clinic.id, ticketId:this.ticket.id}).$promise;
        })
        .then((response) => {
          this.ticket = response;
        });
    }
  }

  TicketAccountListController.$inject = ['$state', 'toaster', 'ClinicTicket', 'TicketAccount', 'clinic', 'ticket', 'accounts'];
  angular.module('petzApp')
    .controller('TicketAccountListController', TicketAccountListController);

})();
