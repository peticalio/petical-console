(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('ChartDetailController', ChartDetailController);

  ChartDetailController.$inject = ['$state', '$stateParams', 'Storage', 'Modal', 'Notify', 'ClinicTicket', 'chart'];
  function ChartDetailController($state, $stateParams, Storage, Modal, Notify, ClinicTicket, chart) {
    // ----- variables
    var _this = this;

    // ----- methods
    function construct() {
      _this.chart = chart;
      _this.editChart = editChart;
      _this.reserve = reserve;
      _this.loadTickets = loadTickets;

      loadTickets();
    }

    // カルテの編集ページへ遷移する
    function editChart(chart) {
      Storage.request.put('chart', chart);
      $state.go('app.dashboard.chart.form');
    }

    // ペットの診察予約ページへ遷移する
    function reserve(chart) {
      var ticket = {clinic:chart.clinic, chart:chart};
      Modal.open('app/dashboard/common/event/event-modal.html', 'EventModalController', 'ctrl', {ticket: function() {return ticket;}}).result
        .then(function() {
          Notify.success('診察の予約を登録しました。詳細は予約スケジュールをご確認ください。');
        });
    }

    // 診察履歴（チケット）を取得する
    function loadTickets() {
      var chart = _this.chart;
      _this.tickets = ClinicTicket.fetch({clinicId:$stateParams.clinicId, petId:chart.pet.id});
    }

    construct();
  }
})();
