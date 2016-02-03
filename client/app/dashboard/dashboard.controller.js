(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('DashboardController', DashboardController);

  // DashboardController.$inject = ['$scope', '$stateParams', 'ClinicTicketSummary', 'ClinicSales', 'Colors', 'ClinicOutline', 'clinics', 'clinic'];
  // function DashboardController($scope, $stateParams, ClinicTicketSummary, ClinicSales, Colors, ClinicOutline, clinics, clinic) {
  DashboardController.$inject = ['$scope', '$stateParams', 'clinics', 'clinic'];
  function DashboardController($scope, $stateParams, clinics, clinic) {

    // ----- variables
    var _this = this;

    // ----- methods
    function construct() {
      _this.clinic = clinic;
      _this.clinics = clinics;

      // loadOutline();
      // loadTicketSummary();
      // loadDailySales();
      // loadMonthlySales();
    }

    function loadOutline() {
      var date = new Date();
      ClinicOutline.get({clinicId:$stateParams.clinicId, year:date.getFullYear(), month:date.getMonth() + 1, day:date.getDate()}).$promise.then(function(response) {
        _this.outline = response;
      });
    }

    function loadTicketSummary() {
      ClinicTicketSummary.get({clinicId:$stateParams.clinicId, type:'daily'}).$promise.then(function(response) {
        response.data.unshift(response.labels);
        _this.ticketChart = {
          options: {
            colors: ['#2196F3']
          },
          type: 'ColumnChart',
          data: response.data
        }
      });
    }

    function loadDailySales() {
      ClinicSales.get({clinicId:$stateParams.clinicId, type:'daily'}).$promise.then(function(response) {
        response.data.unshift(response.labels);
        _this.dailySalesChart = {
          options: {
            colors: ['#8BC34A']
          },
          type: 'ColumnChart',
          data: response.data
        }
      });
    }

    function loadMonthlySales() {
      ClinicSales.get({clinicId:$stateParams.clinicId, type:'daily'}).$promise.then(function(response) {
        response.data.unshift(response.labels);
        _this.monthlySalesChart = {
          options: {
            colors: ['#00BCD4']
          },
          type: 'ColumnChart',
          data: response.data
        }
      });
    }

    construct();
  }
})();
