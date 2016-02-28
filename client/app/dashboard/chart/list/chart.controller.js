(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('ChartController', ChartController);

  ChartController.$inject = ['$q', '$state', '$stateParams', 'ParseLinks', 'Storage', 'Modal', 'Notify', 'Chart', 'ClinicCustomer'];
  function ChartController($q, $state, $stateParams, ParseLinks, Storage, Modal, Notify, Chart, ClinicCustomer) {
    var _this = this;

    // コンストラクタ
    function constructor() {
      // ページングディレクティブ用
      _this.page = 1;
      _this.links = [];
      _this.criteria = {per_page:50, clinicId:$stateParams.clinicId};

      search(_this.criteria);
      _this.search = search;
      _this.loadPage = loadPage;
      _this.editChart = editChart;
      _this.reserve = reserve;

      _this.getCustomer = getCustomer;
      _this.onSelectCustomer = onSelectCustomer;
    }

    // カルテを検索する
    function search(criteria) {
      criteria.page = _this.page;
      return Chart.fetch(criteria).$promise.then(function(response) {
        _this.links = ParseLinks.parse(response.headers('link'));
        _this.charts = response.data;
        return $q.resolve(response.data);
      });
    }

    // ページングディレクティブ用ページング処理
    function loadPage(page) {
      _this.page = page;
      _this.search(_this.criteria);
    }

    // カルテを編集する
    function editChart(chart) {
      Storage.request.put('chart', chart);
      $state.go('app.dashboard.chart.form');
    }

    // ペットの診察予約をする
    function reserve(chart) {
      var ticket = {clinic:chart.clinic, chart:chart};
      Modal.open('app/dashboard/common/event/event-modal.html', 'EventModalController', 'ctrl', {ticket: function() {return ticket;}}).result
        .then(function(data) {
          if (data) {
            Notify.success('診察の予約を登録しました。詳細は予約スケジュールをご確認ください。');
          }
        });
    }

    // 飼い主をドロップダウンに表示する
    function getCustomer(value) {
      return ClinicCustomer.query({clinicId:$stateParams.clinicId, name:value}).$promise.then(function(response) {
        return response;
      });
    }

    // 飼い主がドロップダウンで選択された時の処理
    function onSelectCustomer($item, $model) {
      _this.criteria.customerId = $item.id;
      _this.criteria.customerName = $model;
    }

    constructor();
  }
})();
