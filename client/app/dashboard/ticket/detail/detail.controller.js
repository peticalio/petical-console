(() => {
  'use strict';

  class TicketDetailController {
    constructor($scope, $state, $stateParams, toaster, dialog, ClinicTicket, ClinicTicketStatus, ClinicTicketExamination, ClinicTicketCertificate, ClinicTicketAttachment, ClinicTicketInvoice, clinic, ticket) {
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.dialog = dialog;
      this.ClinicTicket = ClinicTicket;
      this.ClinicTicketStatus = ClinicTicketStatus;
      this.ClinicTicketExamination = ClinicTicketExamination;
      this.ClinicTicketCertificate = ClinicTicketCertificate;
      this.ClinicTicketAttachment = ClinicTicketAttachment;
      this.ClinicTicketInvoice = ClinicTicketInvoice;
      this.clinic = clinic;
      this.ticket = ticket;
      this.selected = this.getSelectedTabNo();
    }

    // ステートから選択されているタブ番号を取得する
    getSelectedTabNo() {
      var no = 0;
      no = this.$state.is('app.dashboard.ticket.detail.examination') ? 1 : no;
      no = this.$state.is('app.dashboard.ticket.detail.certificate') ? 2 : no;
      no = this.$state.is('app.dashboard.ticket.detail.attachment') ? 3 : no;
      no = this.$state.is('app.dashboard.ticket.detail.accounting') ? 4 : no;
      return no;
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

    // // チケットの診察情報を取得する
    // getExaminations() {
    //   return ClinicExamination.fetch({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId}).$promise
    //     .then(function(response) {
    //       _this.examinations = response.data;
    //       return _this.examinations;
    //     });
    // }

    // 請求書を作成する
    create(ticket) {
      ClinicTicketInvoice.save({clinicId:ticket.clinic.id, ticketId:ticket.id}, {}).$promise
        .then(function(response) {
          $state.go('app.dashboard.ticket.detail.invoice', {clinicId:ticket.clinic.id, ticketId:ticket.id, invoiceId:response.data.id});
        });
    }

    // 診察情報を追加する（モーダルを表示する）
    showExaminationModal() {
      var request = {examination: function() {return {ticket:_this.ticket};}};
      Modal.open('app/dashboard/common/examination/examination-modal.html', 'ExaminationModalController', 'ctrl', request).result
        .then(function(data) {
          _this.examinations.push(data);
          Notify.success('診察情報を追加しました。');
        });
    }

    // 指定された診察情報を削除する
    removeExamination(examination) {
      Notify.del(function() {
        ClinicExamination.remove({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId, examinationId:examination.id}).$promise
          .then(function() {
            _this.examinations.some(function(v, i) {
              if (v.id === examination.id) {
                _this.examinations.splice(i, 1);
              }
            });
            Notify.success('指定された診察情報を削除しました。');
          });
      });
    }

    ////////////////////////////// 証明書
    clickCertificatesTab() {
      _this.certificates = ClinicTicketCertificate.query({clinicId:clinic.id, ticketId:ticket.id});
    }

    showRabidModal() {
      var request = {clinic: function() {return clinic;}, ticket: function() {return ticket;}};
      Modal.open('app/dashboard/ticket/certificate/rabid-modal.html', 'RabidModalController', 'ctrl', request).result
        .then(function(response) {
          _this.certificates.push(response);
        });
    }

    showCertificateModal() {
      var request = {clinic: function() {return clinic;}, ticket: function() {return ticket;}};
      Modal.open('app/dashboard/ticket/certificate/certificate-modal.html', 'CertificateModalController', 'ctrl', request).result
        .then(function(response) {
          _this.certificates.push(response);
        });
    }

    viewCertificate(certificate) {
      if (certificate && certificate.type === 'PREVENTION') {
        $state.go('app.dashboard.ticket.certificate.prevention');
      } else if (certificate && certificate.type === 'RABID') {
        $state.go('app.dashboard.ticket.certificate.rabid');
      }
    }

    // 指定した証明書を削除する
    removeCertificate(certificate) {
      Notify.del(function() {
        ClinicTicketCertificate.remove({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId, certificateId:certificate.id}).$promise
          .then(function() {
            _this.certificates.some(function(v, i) {
              if (v.id === certificate.id) {
                _this.certificates.splice(i, 1);
              }
            });
            Notify.success('指定された証明書を削除しました。');
          });
      });
    }

    ////////////////////////////// 添付

    // チケットの添付ファイルを取得する
    getAttachments() {
      this.$scope.$watch('file', function(file) {
        if (file) {
          this.$scope.upload(file);
        }
      });

      TicketAttachment.fetch({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId}).$promise
        .then(function(response) {
          _this.attachments = response.data;
        });
    }

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

    removeAttachment(attachment) {
      TicketAttachment.remove({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId, attachmentId:attachment.id}).$promise
        .then(function() {
          _this.attachments.some(function(v, i) {
            if (v.id === attachment.id) {
              _this.attachments.splice(i, 1);
            }
          });
          Notify.success('添付ファイルを削除しました。');
        });
    }

    ////////////////////////////// 請求書

    getInvoices() {
      ClinicTicketInvoice.query({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId}).$promise
        .then(function(response) {
          _this.invoices = response;
        });
    }

    removeInvoice(invoice) {
      ClinicTicketInvoice.remove({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId, invoiceId:invoice.id}).$promise
        .then(function(response) {
          invoice.removed = true;
          _this.ticket.state = 'DOING';
          Notify.success('新しく請求書を作成して、お会計を完了させてください。', '請求書を削除しました。');
        });
    }
  }

  TicketDetailController.$inject = ['$scope', '$state', '$stateParams', 'toaster', 'dialog', 'ClinicTicket', 'ClinicTicketStatus', 'ClinicTicketExamination', 'ClinicTicketCertificate', 'ClinicTicketAttachment', 'ClinicTicketInvoice', 'clinic', 'ticket'];
  angular.module('petzApp')
    .controller('TicketDetailController', TicketDetailController);

})();
