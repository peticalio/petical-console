(() => {
  'use strict';

  class ChartDetailReservationController {
    constructor($state, $stateParams, toaster, ClinicTicketExamination, ticket, examinations) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicTicketExamination = ClinicTicketExamination;
      this.ticket = ticket;
      this.examinations = examinations;
    }

    // 一覧を更新する
    refresh() {
      this.ClinicTicketExamination.fetch({clinicId: this.$stateParams.clinicId, ticketId: this.$stateParams.ticketId}).$promise
        .then((response) => {
          this.toaster.info('診察内容の一覧を更新しました。');
          this.examinations = response;
        });
    }
  }

  ChartDetailReservationController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicTicketExamination', 'ticket', 'examinations'];
  angular.module('petzApp')
    .controller('TicketDetailExaminationController', ChartDetailReservationController);

})();
