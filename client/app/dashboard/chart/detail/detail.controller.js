(() => {
  'use strict';

  class ChartDetailController {
    constructor($state, $stateParams, toaster, ClinicTicket, chart) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicTicket = ClinicTicket;
      this.chart = chart;

      this.getTickets();
    }

    // ペットの診察予約ページへ遷移する
    reserve() {
      // var ticket = {clinic:chart.clinic, chart:chart};
      // Modal.open('app/dashboard/common/event/event-modal.html', 'EventModalController', 'ctrl', {ticket: function() {return ticket;}}).result
      //   .then(function() {
      //     Notify.success('診察の予約を登録しました。詳細は予約スケジュールをご確認ください。');
      //   });
    }

    // 診察履歴（チケット）を取得する
    getTickets() {
      return this.ClinicTicket.query({clinicId: this.$stateParams.clinicId, petId: this.chart.pet.id}).$promise
        .then((response) => {
          this.tickets = response;
          return response.$promise;
        });
    }
  }

  ChartDetailController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicTicket', 'chart'];
  angular.module('petzApp')
    .controller('ChartDetailController', ChartDetailController);

})();
