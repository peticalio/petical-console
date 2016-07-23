(() => {
  'use strict';

  class TicketAccountListController {
    constructor($state, $uibModal, toaster, ClinicTicket, TicketAccount, TicketPayment, clinic, ticket, accounts, payments) {
      this.$state = $state;
      this.$uibModal = $uibModal;
      this.toaster = toaster;
      this.clinic = clinic;
      this.ticket = ClinicTicket.get({clinicId:clinic.id, ticketId:ticket.id});
      this.ClinicTicket = ClinicTicket;
      this.TicketAccount = TicketAccount;
      this.TicketPayment = TicketPayment;
      this.accounts = accounts;
      this.payments = payments;
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
          this.toaster.info('ご請求情報を再計算しました。');
          this.ticket = response;
        });
    }

    // 支払モーダルを表示する
    showPaymentModal(ticket) {
      var modal = this.$uibModal.open({
        animation: true,
        backdrop: 'static',
        templateUrl: 'payment-modal.html',
        controller: 'PaymentModalController',
        controllerAs: 'ctrl',
        resolve: {
          ticket: ticket
        }
      });
      return modal.result
        .then((payment) => this.TicketPayment.save({clinicId:this.clinic.id, ticketId:this.ticket.id}, payment).$promise)
        .then((response) => {
          this.toaster.success('お支払い情報を登録しました。');
          this.payments.push(response.data);
          this.ticket = this.ClinicTicket.get({clinicId:this.clinic.id, ticketId:this.ticket.id});
        });
    }
  }

  // 支払モーダルのコントローラ
  class PaymentModalController {
    // コンストラクタ
    constructor($uibModalInstance, ticket) {
      this.$uibModalInstance = $uibModalInstance;
      this.ticket = ticket;
      this.payment = {ticket:ticket, date:new Date(), amount:0, discount:0};
    }
    // 保存時の処理
    save(payment) {
      this.$uibModalInstance.close(payment);
    }
    // キャンセル時の処理
    close() {
      this.$uibModalInstance.dismiss('cancel');
    }
  }

  TicketAccountListController.$inject = ['$state', '$uibModal', 'toaster', 'ClinicTicket', 'TicketAccount', 'TicketPayment', 'clinic', 'ticket', 'accounts', 'payments'];
  angular.module('petzApp')
    .controller('TicketAccountListController', TicketAccountListController);

  PaymentModalController.$inject = ['$uibModalInstance', 'ticket'];
  angular.module('petzApp')
    .controller('PaymentModalController', PaymentModalController);

})();
