(() => {
  'use strict';

  // ペットの種別を取得する
  function getTypes(Type) {
    return Type.query().$promise
      .then(function(response) {
        return response;
      });
  }

  // ペットの毛色を取得する
  function getColors(Color) {
    return Color.query().$promise
      .then(function(response) {
        return response;
      });
  }

  // ペットの血液型を取得する
  function getBloods(Blood) {
    return Blood.query().$promise
      .then(function(response) {
        return response;
      });
  }

  // ペットのタグを取得する
  function getTags(Tag) {
    return Tag.query().$promise
      .then(function(response) {
        return response;
      });
  }

  // ペットの飼い主を取得する
  function getCustomer($stateParams, ClinicCustomer) {
    if (!$stateParams.customerId) {
      return {};
    }
    return ClinicCustomer.load({clinicId:$stateParams.clinicId, customerId:$stateParams.customerId}).$promise
      .then(function(response) {
        return response;
      });
  }

  // ペットを取得する
  function getPet($stateParams, Pet) {
    if (!$stateParams.petId) {
      return {};
    }
    return Pet.load({petId:$stateParams.petId}).$promise
      .then(function(response) {
        return response;
      });
  }

  function getClinicChart($stateParams, ClinicChart) {
    return ClinicChart.get({clinicId: $stateParams.clinicId, chartId: $stateParams.chartId}).$promise
      .then((response) => response);
  }

  // configure state provider

  function ClinicChartRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.chart', {
        abstract: true,
        url:      '^/clinics/:clinicId/charts'
      })
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
          customer:       getCustomer
        }
      })
      .state('app.dashboard.chart.form.pet', {
        url: '^/clinics/:clinicId/customers/:customerId/pets/:petId/charts/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/form/form.html',
            controller:   'ChartFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          pet:            getPet
        }
      })
      .state('app.dashboard.chart.upload', {
        url: '^/clinics/:clinicId/charts/upload/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/upload/upload.html',
            controller:   'ChartUploadController',
            controllerAs: 'ctrl'
          }
        }
      })

      .state('app.dashboard.chart.list', {
        url: '/list',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/chart/list/list.html',
            controller:   'ChartListController',
            controllerAs: 'ctrl'
          }
        }
      })

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
