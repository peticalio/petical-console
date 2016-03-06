(() => {
  'use strict';

  // ペットの種別を取得する
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

  function ClinicChartRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.chart', {
        abstract: true,
        url:      '^/clinics/:clinicId/charts'
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
      // カルテ一覧
      .state('app.dashboard.chart.list', {
        url: '/list',
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
    ;
  }

  ClinicChartRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicChartRouter);

})();
