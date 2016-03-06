(() => {
  'use strict';

  class TicketListController {
    constructor($state, $stateParams, toaster, ClinicTicket, tickets) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicTicket = ClinicTicket;
      this.tickets = tickets;
      this.today = new Date();
    }

    refresh() {
      var today = new Date();
      var criteria = {clinicId: this.$stateParams.clinicId, year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
      this.ClinicTicket.fetch(criteria).$promise
        .then((response) => {
          this.toaster.info('チケットの一覧を更新しました。');
          this.tickets = response;
        });
    }
  }

  TicketListController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicTicket', 'tickets'];
  angular.module('petzApp')
    .controller('TicketListController', TicketListController);

})();
