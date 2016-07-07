(() => {
  'use strict';

  class TicketDetailController {
    constructor($scope, $state, $stateParams, toaster, dialog, ClinicTicket, ClinicTicketStatus, ClinicTicketExamination, ClinicTicketCertificate, ClinicTicketAttachment, ClinicTicketInvoice, clinic, ticket, charges, medicines, diagnosises) {
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.dialog = dialog;
      this.charges = charges;
      this.medicines = medicines;
      this.diagnosises = diagnosises;
      this.ClinicTicket = ClinicTicket;
      this.ClinicTicketStatus = ClinicTicketStatus;
      this.ClinicTicketExamination = ClinicTicketExamination;
      this.ClinicTicketCertificate = ClinicTicketCertificate;
      this.ClinicTicketAttachment = ClinicTicketAttachment;
      this.ClinicTicketInvoice = ClinicTicketInvoice;
      this.clinic = clinic;
      this.ticket = ticket;
    }

    // ステータスを受付済みにする
    receipt(ticket) {
      this.ClinicTicketStatus.signal({clinicId: this.clinic.id, ticketId: ticket.id}, {}).$promise
        .then((response) => {
          this.toaster.info('ステータスを「受付済み」に変更しました。');
          this.ticket = response;
        });
    }

    // ステータスをキャンセルにする
    delete(event, ticket) {
      this.dialog.delete(event, ticket)
        .then(() => {
          return this.ClinicTicket.remove({clinicId: this.clinic.id, ticketId: ticket.id}).$promise;
        })
        .then(() => {
          this.toaster.info('チケットをキャンセルしました。');
          this.ticket.state = 'CANCEL';
          var today = new Date();
          this.ClinicTicket.fetch({clinicId: this.clinic.id, year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()});
        });
    }

    ////////////////////////////// 添付

    // $scope.upload = function(file) {
    //   // TODO リファクタリングした方がよさそう
    //   Upload.upload({
    //     url: 'http://localhost:8080/api/v1/clinics/' + $stateParams.clinicId + '/tickets/' + $stateParams.ticketId + '/attachments',
    //     fields: {'username': $scope.username},
    //     file: file
    //   }).progress(function (evt) {
    //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //   }).success(function (data, status, headers, config) {
    //     _this.attachments.push(data);
    //     Notify.success('添付ファイルをアップロードしました。');
    //   }).error(function (data, status, headers, config) {
    //     Notify.error('添付ファイルがアップロードできませんでした。');
    //   })
    // };
  }

  TicketDetailController.$inject = ['$scope', '$state', '$stateParams', 'toaster', 'dialog', 'ClinicTicket', 'ClinicTicketStatus', 'ClinicTicketExamination', 'ClinicTicketCertificate', 'ClinicTicketAttachment', 'ClinicTicketInvoice', 'clinic', 'ticket', 'charges', 'medicines', 'diagnosises'];
  angular.module('petzApp')
    .controller('TicketDetailController', TicketDetailController);

})();
