(() => {
  'use strict';

  class TicketDetailController {
    constructor($state, $stateParams, toaster, dialog, ClinicTicket, ClinicInspection, Diagnosis, TicketInspection, ClinicTicketAttachment, clinic, ticket) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.dialog = dialog;
      this.clinic = clinic;
      this.ticket = ticket;
      this.total = 0;

      this.ClinicTicket = ClinicTicket;
      this.ClinicInspection = ClinicInspection;
      this.Diagnosis = Diagnosis;

      // 検査
      this.inspection = {quantity:1};
      this.TicketInspection = TicketInspection;
      this.TicketInspection.query({clinicId:this.clinic.id, ticketId:this.ticket.id}).$promise
        .then((response) => {
          this.ticketInspections = response;
          this.ticketInspections.forEach((element) => this.total += element.subtotal);
        });

      this.editable = this.ticket.state !== 'COMPLETED';
    }

    // 稟告や診断結果を保存する
    save(ticket) {
      this.ClinicTicket.update({clinicId:ticket.clinic.id, ticketId:ticket.id}, ticket).$promise
        .then(() => this.toaster.info('チケットに情報を保存しました。'));
    }
    // 診断結果マスタをロードする
    loadDiagnosises() {
      this.Diagnosis.query().$promise
        .then((response) => this.diagnosises = response);
    }

    // 動物病院の検査マスタをロードする
    loadClinicInspections() {
      this.ClinicInspection.query({clinicId:this.clinic.id}).$promise
        .then((response) => this.inspections = response);
    }
    // 検査情報を保存する
    saveTicketInspection(inspection) {
      inspection.ticket = this.ticket;
      this.TicketInspection.save({clinicId:this.clinic.id, ticketId:this.ticket.id}, inspection).$promise
        .then((response) => {
          this.ticketInspections.push(response.data);
          this.total += response.data.subtotal;
          this.inspection = {quantity:1};
          this.toaster.info('チケットに実施した検査情報を追加しました。');
        });
    }
    // 検査情報を削除する
    removeTicketInspection(inspection, index) {
      this.TicketInspection.delete({clinicId:this.clinic.id, ticketId:this.ticket.id, inspectionId:inspection.id}).$promise
        .then(() => {
          this.ticketInspections.splice(index, 1);
          this.total -= inspection.subtotal;
          this.toaster.info('チケットから検査情報を削除しました。');
        });
    }

    // ステータスをキャンセルにする
    delete(event, ticket) {
      this.dialog.delete(event, ticket)
        .then(() => this.ClinicTicket.remove({clinicId:this.clinic.id, ticketId:ticket.id}).$promise)
        .then(() => {
          this.toaster.info('チケットをキャンセルしました。');
          this.ClinicChartTicket.clear({clinicId:this.clinic.id, chartId:ticket.chart.id}); // キャッシュクリア
          this.$state.go('app.dashboard.chart.detail', {clinicId:this.clinic.id, chartId:ticket.chart.id});
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

  TicketDetailController.$inject = ['$state', '$stateParams', 'toaster', 'dialog', 'ClinicTicket', 'ClinicInspection', 'Diagnosis', 'TicketInspection', 'ClinicTicketAttachment', 'clinic', 'ticket'];
  angular.module('petzApp')
    .controller('TicketDetailController', TicketDetailController);

})();
