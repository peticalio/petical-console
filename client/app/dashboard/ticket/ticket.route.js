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

  // チケットに関する診察内容を取得する
  function getClinicTicketExaminations(clinic, ticket, ClinicTicketExamination) {
    return ClinicTicketExamination.query({clinicId: clinic.id, ticketId: ticket.id}).$promise
      .then((response) => response);
  }
  // 診察内容を取得する（指定がない場合はオブジェクトを返す）
  function getClinicTicketExamination($stateParams, clinic, ticket, ClinicTicketExamination) {
    if ($stateParams.examinationId) {
      return ClinicTicketExamination.load({clinicId: clinic.id, ticketId: ticket.id, examinationId: $stateParams.examinationId}).$promise
        .then((response) => response);
    }
    return {ticket: ticket};
  }
  // 商品を取得する
  function getClinicProducts(clinic, ClinicProduct) {
    return ClinicProduct.query({clinicId: clinic.id}).$promise
      .then((response) => response);
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

  function DashboardTicketRouter($stateProvider){
    $stateProvider
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
        abstract: true,
        url: '/examinations'
      })
      // チケット詳細（診察内容一覧）
      .state('app.dashboard.ticket.detail.examination.list', {
        url: '/list',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/examination/examination.html',
            controller:   'TicketDetailExaminationController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          examinations:   getClinicTicketExaminations
        }
      })
      // チケット詳細（診察内容登録フォーム）
      .state('app.dashboard.ticket.detail.examination.form', {
        url: '/form',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/examination/form/form.html',
            controller:   'TicketDetailExaminationFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          examination:    getClinicTicketExamination,
          products:       getClinicProducts
        }
      })
      // チケット詳細（診察内容登録フォーム）
      .state('app.dashboard.ticket.detail.examination.update', {
        url: '/:examinationId/form',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/examination/form/form.html',
            controller:   'TicketDetailExaminationFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          examination:    getClinicTicketExamination,
          products:       getClinicProducts
        }
      })
      // チケット詳細（診察内容登録フォーム）
      .state('app.dashboard.ticket.detail.examination.detail', {
        url: '/:examinationId',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/examination/detail/detail.html',
            controller:   'TicketDetailExaminationDetailController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          examination:    getClinicTicketExamination
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

      // チケット詳細（会計）
      .state('app.dashboard.ticket.detail.invoice', {
        abstract: true,
        url: '/invoices'
      })
      // チケット詳細（会計一覧）
      .state('app.dashboard.ticket.detail.invoice.list', {
        url: '/list',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/invoice/invoice.html',
            controller:   'TicketDetailInvoiceController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          invoices:        getInvoices
        }
      })
      // チケット詳細（請求書詳細）
      .state('app.dashboard.ticket.detail.invoice.detail', {
        url: '/:invoiceId',
        views: {
          '@app.dashboard.ticket.detail': {
            templateUrl:  'app/dashboard/ticket/detail/invoice/detail/detail.html',
            controller:   'TicketDetailInvoiceDetailController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          invoice:        getClinicInvoice,
          examinations:   getClinicTicketExaminations
        }
      })
    ;
  }

  DashboardTicketRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(DashboardTicketRouter);

})();
