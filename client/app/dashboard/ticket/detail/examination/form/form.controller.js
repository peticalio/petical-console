(() => {
  'use strict';

  class TicketDetailExaminationFormController {
    constructor($state, toaster, ClinicTicketExamination, clinic, ticket, examination, products) {
      this.$state = $state;
      this.toaster = toaster;
      this.ClinicTicketExamination = ClinicTicketExamination;
      this.clinic = clinic;
      this.ticket = ticket;
      this.examination = examination;
      this.products = products;
    }

    getProducts(text) {
      return this.products.filter((item) => {
        return (item.name.indexOf(text) >= 0) ? true : false;
      });
    }

    // 登録する商品を決定する
    selectProduct(product) {
      this.examination.name = product.name;
      this.examination.price = product.price;
      this.examination.taxType = product.taxType;
      this.examination.taxRate = product.taxRate;
      this.examination.quantity = 1;
    }

    save(examination) {
      examination.examinationDateTime = new Date();
      this.ClinicTicketExamination.save({clinicId: this.clinic.id, ticketId: this.ticket.id}, examination).$promise
        .then(() => this.ClinicTicketExamination.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise)
        .then(() => {
          this.toaster.info('新しく診察内容を追加しました。');
          this.$state.go('app.dashboard.ticket.detail.examination.list');
        });
    }

    update(examination) {
      this.ClinicTicketExamination.update({clinicId: this.clinic.id, ticketId: this.ticket.id, examinationId: examination.id}, examination).$promise
        .then(() => this.ClinicTicketExamination.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise)
        .then(() => {
          this.toaster.info('診察内容を更新しました。');
          this.$state.go('app.dashboard.ticket.detail.examination.list');
        });
    }

    delete(examination) {
      this.ClinicTicketExamination.remove({clinicId: this.clinic.id, ticketId: this.ticket.id, examinationId: examination.id}).$promise
        .then(() => this.ClinicTicketExamination.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise)
        .then(() => {
          this.toaster.info('診察内容を削除しました。');
          this.$state.go('app.dashboard.ticket.detail.examination.list');
        });
    }
  }

  TicketDetailExaminationFormController.$inject = ['$state', 'toaster', 'ClinicTicketExamination', 'clinic', 'ticket', 'examination', 'products'];
  angular.module('petzApp')
    .controller('TicketDetailExaminationFormController', TicketDetailExaminationFormController);

})();
