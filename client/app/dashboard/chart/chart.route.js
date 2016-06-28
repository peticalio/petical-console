(() => {
  'use strict';

  // ペットの種類を取得する
  function getKinds(Kind) {
    return Kind.query().$promise
      .then((response) => response);
  }

  // ペットの品種を取得する
  function getTypes(Type) {
    return Type.query().$promise
      .then((response) => response);
  }

  // ペットの毛色を取得する
  function getColors(Color) {
    return Color.query().$promise
      .then((response) => response);
  }

  // ペットの血液型を取得する
  function getBloods(Blood) {
    return Blood.query().$promise
      .then((response) => response);
  }

  // ペットのタグを取得する
  function getTags(Tag) {
    return Tag.query().$promise
      .then((response) => response);
  }

  // ペットの飼い主を取得する（TODO このままで良いか微妙なところ）
  function getChartByCustomer($stateParams, ClinicCustomer) {
    if (!$stateParams.customerId) {
      return {};
    }
    return ClinicCustomer.load({clinicId:$stateParams.clinicId, customerId:$stateParams.customerId}).$promise
      .then((response) => {
        return {customer: response, pet: {}};
      });
  }

  // ペットの飼い主を取得する
  function getChartByPet($stateParams, ClinicCustomer, Pet) {
    if (!$stateParams.customerId || !$stateParams.petId) {
      return {};
    }
    var pet = null;
    return Pet.load({petId: $stateParams.petId}).$promise
      .then((response) => {
        pet = response;
        return ClinicCustomer.load({clinicId:$stateParams.clinicId, customerId:$stateParams.customerId}).$promise;
      })
      .then((response) => {
        var chart = {customer: response, pet: pet};
        return chart;
      });
  }

  function getClinicChart($stateParams, ClinicChart) {
    return ClinicChart.load({clinicId: $stateParams.clinicId, chartId: $stateParams.chartId}).$promise
      .then((response) => response);
  }

  function getCharts($stateParams, ClinicChart) {
    return ClinicChart.query({clinicId: $stateParams.clinicId}).$promise
      .then((response) => response);
  }

  function getClinicChartTickets(clinic, chart, ClinicChartTicket) {
    return ClinicChartTicket.query({clinicId: clinic.id, chartId: chart.id, state: 'COMPLETED'}).$promise
      .then((response) => response);
  }

  function getClinicChartReservations(clinic, chart, ClinicChartTicket) {
    return ClinicChartTicket.query({clinicId: clinic.id, chartId: chart.id, state: 'RESERVED'}).$promise
      .then((response) => response);
  }

  function ClinicChartRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.chart', {
        url:      '^/clinics/:clinicId/charts',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/list/list.html',
            controller:   'ChartListController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          charts:         getCharts
        }
      })
      // カルテ新規作成（顧客特定済みの場合）
      .state('app.dashboard.chart.form', {
        url: '^/clinics/:clinicId/customers/:customerId/charts/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/form/form.html',
            controller:   'ChartFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          kinds:          getKinds,
          types:          getTypes,
          colors:         getColors,
          bloods:         getBloods,
          tags:           getTags,
          chart:          getChartByCustomer
        }
      })
      // カルテ編集フォーム
      .state('app.dashboard.chart.update', {
        url: '/:chartId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/form/form.html',
            controller:   'ChartFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          kinds:          getKinds,
          types:          getTypes,
          colors:         getColors,
          bloods:         getBloods,
          tags:           getTags,
          chart:          getClinicChart
        }
      })
      // カルテインポートフォーム
      .state('app.dashboard.chart.import', {
        url: '^/clinics/:clinicId/customers/:customerId/pets/:petId/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/form/form.html',
            controller:   'ChartFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          kinds:          getKinds,
          types:          getTypes,
          colors:         getColors,
          bloods:         getBloods,
          tags:           getTags,
          chart:          getChartByPet
        }
      })
      // カルテアップロードフォーム
      .state('app.dashboard.chart.upload', {
        url: '/upload',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/upload/upload.html',
            controller:   'ChartUploadController',
            controllerAs: 'ctrl'
          }
        }
      })
      // カルテ詳細
      .state('app.dashboard.chart.detail', {
        url: '/:chartId',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/detail/detail.html',
            controller:   'ChartDetailController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          chart:          getClinicChart
        }
      })

      // カルテ詳細（診察履歴）
      .state('app.dashboard.chart.detail.ticket', {
        abstract: true,
        url: '/tickets'
      })
      // カルテ詳細（診察履歴一覧）
      .state('app.dashboard.chart.detail.ticket.list', {
        url: '/list',
        views: {
          '@app.dashboard.chart.detail': {
            templateUrl:  'app/dashboard/chart/detail/ticket/ticket.html',
            controller:   'ChartDetailTicketController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          tickets:   getClinicChartTickets
        }
      })

      // カルテ詳細（診察予約）
      .state('app.dashboard.chart.detail.reservation', {
        abstract: true,
        url: '/reservations'
      })
      // カルテ詳細（診察予約一覧）
      .state('app.dashboard.chart.detail.reservation.list', {
        url: '/list',
        views: {
          '@app.dashboard.chart.detail': {
            templateUrl:  'app/dashboard/chart/detail/reservation/reservation.html',
            controller:   'ChartDetailReservationController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          tickets:   getClinicChartReservations
        }
      })
    ;
  }

  ClinicChartRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicChartRouter);

})();
