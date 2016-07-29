(() => {
  'use strict';

  // 当日分のチケットを全て取得する
  function getTickets($stateParams, ClinicTicket) {
    // ミッションクリティカルな機能なので、常にフェッチする
    var today = new Date();
    return ClinicTicket.fetch({clinicId: $stateParams.clinicId, year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()}).$promise
      .then((response) => response);
  }

  // 指定のチケットを取得する
  function getTicket($stateParams, ClinicTicket) {
    return ClinicTicket.load({clinicId:$stateParams.clinicId, ticketId:$stateParams.ticketId}).$promise
      .then(function(response) {
        return response;
      });
  }

  // チケットに関する証明書の一覧を取得する
  function getCertificates(clinic, ticket, ClinicTicketCertificate) {
    return ClinicTicketCertificate.query({clinicId: clinic.id, ticketId: ticket.id}).$promise
      .then((response) => response);
  }
  // ワクチンを取得する
  function getClinicVaccines(clinic, ClinicVaccine) {
    return ClinicVaccine.query({clinicId: clinic.id}).$promise
      .then((response) => response);
  }
  // チケットに関する証明書の詳細を取得する
  function getClinicTicketCertificate($stateParams, clinic, ticket, ClinicTicketCertificate) {
    if (!$stateParams.certificateId) {
      return {};
    }
    return ClinicTicketCertificate.load({clinicId: clinic.id, ticketId: ticket.id, certificateId: $stateParams.certificateId}).$promise
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

  // 請求書を取得する
  function getClinicInvoice($stateParams, clinic, ClinicInvoice) {
    return ClinicInvoice.load({clinicId: clinic.id, invoiceId: $stateParams.invoiceId}).$promise
      .then((response) => response);
  }

  // カルテをもとにチケットを取得する
  function getTicketByChart($stateParams, ClinicChart, clinic) {
    return ClinicChart.load({clinicId: $stateParams.clinicId, chartId: $stateParams.chartId}).$promise
      .then((response) => {
        return {chart: response, clinic: clinic};
      });
  }

  function getDiagnosises(Diagnosis) {
    return Diagnosis.query().$promise.then((response) => response);
  }
  function getMedicines(ClinicMedicine, clinic) {
    return ClinicMedicine.query({clinicId: clinic.id}).$promise.then((response) => response);
  }
  function getInspections(ClinicInspection, clinic) {
    return ClinicInspection.query({clinicId: clinic.id}).$promise.then((response) => response);
  }
  function getAccounts(TicketAccount, clinic, ticket) {
    return TicketAccount.query({clinicId:clinic.id, ticketId:ticket.id}).$promise.then((response) => response);
  }
  function getPayments(TicketPayment, clinic, ticket) {
    return TicketPayment.query({clinicId:clinic.id, ticketId:ticket.id}).$promise.then((response) => response);
  }

  function DashboardTicketRouter($stateProvider){
    $stateProvider
      // チケット一覧
      .state('app.dashboard.ticket', {
        url: '^/clinics/:clinicId/tickets',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/ticket/list/list.html',
            controller:   'TicketListController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: 'チケット一覧'
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
        ncyBreadcrumb: {
          label: 'チケット予約・受付'
        },
        resolve: {
          ticket:         getTicketByChart
        }
      })
      // チケット更新フォーム
      .state('app.dashboard.ticket.update', {
        url: '^/clinics/:clinicId/tickets/:ticketId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/ticket/form/form.html',
            controller:   'TicketFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: 'チケット変更'
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
        ncyBreadcrumb: {
          label: 'チケット詳細'
        },
        resolve: {
          ticket:         getTicket,
          inspections:    getInspections,
          medicines:      getMedicines,
          diagnosises:    getDiagnosises
        }
      })

      // 会計
      .state('app.dashboard.ticket.detail.account', {
        url: '/accounts',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/ticket/detail/account/account.html',
            controller:   'TicketAccountListController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: 'お会計'
        },
        resolve: {
          accounts:        getAccounts,
          payments:        getPayments
        }
      })
      // 請求書
      .state('app.dashboard.ticket.detail.account.invoice', {
        url: '/invoice',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/ticket/detail/account/invoice/invoice.html',
            controller:   'TicketInvoiceController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: '診療明細書兼領収書'
        }
      })



      // チケット詳細（証明書）
      .state('app.dashboard.ticket.detail.certificate', {
        abstract: true,
        url: '/certificates'
      })
      // チケット詳細（証明書一覧）
      .state('app.dashboard.ticket.detail.certificate.list', {
        url: '/list',
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
      // チケット詳細（証明書発行フォーム）
      .state('app.dashboard.ticket.detail.certificate.form', {
        url: '/form',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/certificate/certificate-form/certificate-form.html',
            controller:   'TicketDetailCertificateFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          vaccines:   getClinicVaccines,
          certificate: getClinicTicketCertificate
        }
      })
      // チケット詳細（狂犬病予防接種証明書発行フォーム）
      .state('app.dashboard.ticket.detail.certificate.rabidform', {
        url: '/rabidform',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/certificate/rabid-form/rabid-form.html',
            controller:   'TicketDetailCertificateRabidFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          certificate: getClinicTicketCertificate
        }
      })
      // チケット詳細（証明書印刷プレビュー）
      .state('app.dashboard.ticket.detail.certificate.detail', {
        url: '/:certificateId',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/certificate/detail/detail.html',
            controller:   'TicketDetailCertificateDetailController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          certificate:   getClinicTicketCertificate
        }
      })

      // チケット詳細（添付）
      .state('app.dashboard.ticket.detail.attachment', {
        abstract: true,
        url: '/attachments'
      })
      // チケット詳細（添付の一覧）
      .state('app.dashboard.ticket.detail.attachment.list', {
        url: '/list',
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
    ;
  }

  DashboardTicketRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(DashboardTicketRouter);

})();
