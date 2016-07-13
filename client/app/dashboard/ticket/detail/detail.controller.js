(() => {
  'use strict';

  class TicketDetailController {
    constructor($state, $stateParams, toaster, dialog, ClinicTicket, ClinicTicketStatus, TicketInspection, ClinicTicketCertificate, ClinicTicketAttachment, ClinicTicketInvoice, clinic, ticket, inspections, medicines, diagnosises) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.dialog = dialog;
      this.clinic = clinic;
      this.ticket = ticket;
      this.total = 0;

      this.medicines = medicines;
      this.diagnosises = diagnosises;
      this.ClinicTicket = ClinicTicket;
      this.ClinicTicketStatus = ClinicTicketStatus;
      this.ClinicTicketCertificate = ClinicTicketCertificate;
      this.ClinicTicketAttachment = ClinicTicketAttachment;
      this.ClinicTicketInvoice = ClinicTicketInvoice;

      // 検査
      this.inspection = {quantity:1};
      this.inspections = inspections;
      this.TicketInspection = TicketInspection;
      this.TicketInspection.query({clinicId:this.clinic.id, ticketId:this.ticket.id}).$promise
        .then((response) => {
          this.ticketInspections = response;
          this.ticketInspections.forEach((element) => this.total += element.subtotal);
        });
    }

    // 稟告や診断結果を保存する
    save(ticket) {
      this.ClinicTicket.update({clinicId: ticket.clinic.id, ticketId: ticket.id}, ticket).$promise
        .then(() => this.toaster.info('チケットに情報を保存しました。'));
    }

    // 検査情報を保存する
    saveTicketInspection(inspection) {
      inspection.ticket = this.ticket;
      this.TicketInspection.save({clinicId: this.clinic.id, ticketId: this.ticket.id}, inspection).$promise
        .then((response) => {
          this.ticketInspections.push(response.data);
          this.total += response.data.subtotal;
          this.inspection = {quantity:1};
          this.toaster.info('チケットに実施した検査情報を追加しました。');
        });
    }

    // ステータスをキャンセルにする
    delete(event, ticket) {
      this.dialog.delete(event, ticket)
        .then(() => this.ClinicTicket.remove({clinicId:this.clinic.id, ticketId:ticket.id}).$promise)
        .then(() => {
          this.toaster.info('チケットをキャンセルしました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId:this.clinic.id}, {reload:true});
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

  TicketDetailController.$inject = ['$state', '$stateParams', 'toaster', 'dialog', 'ClinicTicket', 'ClinicTicketStatus', 'TicketInspection', 'ClinicTicketCertificate', 'ClinicTicketAttachment', 'ClinicTicketInvoice', 'clinic', 'ticket', 'inspections', 'medicines', 'diagnosises'];
  angular.module('petzApp')
    .controller('TicketDetailController', TicketDetailController);

})();
