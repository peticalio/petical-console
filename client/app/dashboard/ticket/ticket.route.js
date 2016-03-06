(() => {
  'use strict';

  // 当日分のチケットを全て取得する
  function getTickets($stateParams, ClinicTicket) {
    var today = new Date();
    return ClinicTicket.query({clinicId: $stateParams.clinicId, year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()}).$promise
      .then((response) => response);
  }

  // 指定のチケットを取得する
  function getTicket($stateParams, ClinicTicket) {
    return ClinicTicket.load({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId}).$promise
      .then(function(response) {
        return response;
      });
  }

  // チケットに関する診察内容を取得する
  function getExaminations(clinic, ticket, ClinicTicketExamination) {
    return ClinicTicketExamination.query({clinicId: clinic.id, ticketId: ticket.id}).$promise
      .then((response) => response);
  }

  // チケットに関する証明書を取得する
  function getCertificates(clinic, ticket, ClinicTicketCertificate) {
    return ClinicTicketCertificate.query({clinicId: clinic.id, ticketId: ticket.id}).$promise
      .then((response) => response);
  }

  // チケットに関する証明書を取得する
  function getAttachments(clinic, ticket, ClinicTicketAttachment) {
    return ClinicTicketAttachment.query({clinicId: clinic.id, ticketId: ticket.id}).$promise
      .then((response) => response);
  }

  // 指定の請求書を取得する
  function getInvoices(clinic, ticket, ClinicTicketInvoice) {
    return ClinicTicketInvoice.query({clinicId: clinic.id, ticketId: ticket.id}).$promise
      .then((response) => response);
  }

  // カルテをもとにチケットを取得する
  function getTicketByChart($stateParams, ClinicChart, clinic) {
    return ClinicChart.load({clinicId: $stateParams.clinicId, chartId: $stateParams.chartId}).$promise
      .then((response) => {
        return {chart: response, clinic: clinic};
      });
  }

  function DashboardTicketRouter($stateProvider){
    $stateProvider
      .state('app.dashboard.ticket', {
        abstract: true,
        url: '^/clinics/:clinicId/tickets'
      })
      // チケット一覧
      .state('app.dashboard.ticket.list', {
        url: '/list',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/ticket/list/list.html',
            controller:   'TicketListController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          tickets:        getTickets
        }
      })
      // チケット新規作成フォーム
      .state('app.dashboard.ticket.form', {
        url: '^/clinics/:clinicId/charts/:chartId/tickets/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/ticket/form/form.html',
            controller:   'TicketFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          ticket:         getTicketByChart
        }
      })
      .state('app.dashboard.ticket.update', {
        url: '^/clinics/:clinicId/tickets/:ticketId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/ticket/form/form.html',
            controller:   'TicketFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          ticket:         getTicket
        }
      })

      // チケット詳細
      .state('app.dashboard.ticket.detail', {
        url: '/:ticketId',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/ticket/detail/detail.html',
            controller:   'TicketDetailController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          ticket:         getTicket
        }
      })
      // チケット詳細（診察内容）
      .state('app.dashboard.ticket.detail.examination', {
        url: '/examinations',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/examination/examination.html',
            controller:   'TicketDetailExaminationController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          examinations:   getExaminations
        }
      })
      // チケット詳細（証明書）
      .state('app.dashboard.ticket.detail.certificate', {
        url: '/certificates',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/certificate/certificate.html',
            controller:   'TicketDetailCertificateController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          certificates:   getCertificates
        }
      })
      // チケット詳細（添付）
      .state('app.dashboard.ticket.detail.attachment', {
        url: '/attachments',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/attachment/attachment.html',
            controller:   'TicketDetailAttachmentController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          attachments:    getAttachments
        }
      })
      // チケット詳細（お支払い）
      .state('app.dashboard.ticket.detail.accounting', {
        url: '/accountings',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/accounting/accounting.html',
            controller:   'TicketDetailAccountingController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          invoices:        getInvoices
        }
      })
      // チケット詳細（請求書） @Deprecated
      .state('app.dashboard.ticket.detail.invoice', {
        url: '/invoices/:invoiceId',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/invoice/invoice.html',
            controller:   'InvoiceController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          invoice:        getInvoices,
          examinations:   getExaminations
        }
      })
    ;
  }

  DashboardTicketRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(DashboardTicketRouter);

})();
