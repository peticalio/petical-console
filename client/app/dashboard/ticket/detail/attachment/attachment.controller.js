(() => {
  'use strict';

  class TicketDetailAttachmentController {
    constructor($state, $stateParams, toaster, ClinicTicketAttachment, clinic, ticket, attachments) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicTicketAttachment = ClinicTicketAttachment;
      this.clinic = clinic;
      this.ticket = ticket;
      this.attachments = attachments;
    }

    // 一覧を更新する
    refresh() {
      this.ClinicTicketAttachment.fetch({clinicId: this.clinic.id, ticketId: this.ticket.id}).$promise
        .then((response) => {
          this.toaster.info('添付ファイルの一覧を更新しました。');
          this.attachments = response;
        });
    }
  }

  TicketDetailAttachmentController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicTicketAttachment', 'clinic', 'ticket', 'attachments'];
  angular.module('petzApp')
    .controller('TicketDetailAttachmentController', TicketDetailAttachmentController);

})();
