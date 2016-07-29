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

  // カルテをもとにチケットを取得する
  function getTicketByChart($stateParams, ClinicChart, clinic) {
    return ClinicChart.load({clinicId: $stateParams.clinicId, chartId: $stateParams.chartId}).$promise
      .then((response) => {
        return {chart: response, clinic: clinic};
      });
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
          ticket:         getTicket
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
    ;
  }

  DashboardTicketRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(DashboardTicketRouter);

})();
