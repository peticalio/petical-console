(() => {
  'use strict';

  class TicketListController {
    constructor($state, $stateParams, toaster, ClinicTicket, ClinicTicketStatus, clinic, tickets) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.toaster = toaster;
      this.ClinicTicket = ClinicTicket;
      this.ClinicTicketStatus = ClinicTicketStatus;
      this.clinic = clinic;
      this.today = new Date();
      this.reseparate(tickets);

      this.waitingListOptions = {
        placeholder: 'ptc-sortable',
        connectWith: '.dropable-container',
        receive:      (elm, ui) => {
          var id = ui.item.context.id;
          var params = {clinicId:this.clinic.id, ticketId: id, status:'RECEIPTED'};
          this.ClinicTicketStatus.update(params, {}).$promise
            .then(() => this.change(this.waitings, id, 'RECEIPTED'));
        }
      };

      this.examinationListOptions = {
        placeholder: 'ptc-sortable',
        connectWith: '.dropable-container',
        receive:      (elm, ui) => {
          var id = ui.item.context.id;
          var params = {clinicId:this.clinic.id, ticketId: id, status:'DOING'};
          this.ClinicTicketStatus.update(params, {}).$promise
            .then(() => this.change(this.examinatings, id, 'DOING'));
        }
      };

      this.accountingListOptions = {
        placeholder: 'ptc-sortable',
        connectWith: '.dropable-container',
        receive:      (elm, ui) => {
          var id = ui.item.context.id;
          var params = {clinicId:this.clinic.id, ticketId: id, status:'PAYMENT'};
          this.ClinicTicketStatus.update(params, {}).$promise
            .then(() => this.change(this.accountings, id, 'PAYMENT'));
        }
      };

      this.completedListOptions = {
        placeholder: 'ptc-sortable',
        connectWith: '.dropable-container',
        items:       'div:not(.ptc-not-sortable)',
        receive:      (elm, ui) => {
          var id = ui.item.context.id;
          var params = {clinicId:this.clinic.id, ticketId: id, status:'COMPLETED'};
          this.ClinicTicketStatus.update(params, {}).$promise
            .then(() => this.change(this.completed, id, 'COMPLETED'));
        }
      };
    }

    // チケットを再取得してリフレッシュする
    refresh() {
      var today = new Date();
      var criteria = {clinicId: this.$stateParams.clinicId, year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
      this.ClinicTicket.fetch(criteria).$promise
        .then((response) => {
          this.toaster.info('チケットの一覧を更新しました。');
          this.reseparate(response);
        });
    }

    // チケットを各スイムレーンに仕分けする
    reseparate(tickets) {
      this.waitings = [];
      this.examinatings = [];
      this.accountings = [];
      this.completed = [];
      tickets.forEach((elm) => {
        switch (elm.state) {
          case 'RESERVED':
            this.waitings.push(elm);
            break;
          case 'RECEIPTED':
            this.waitings.push(elm);
            break;
          case 'DOING':
            this.examinatings.push(elm);
            break;
          case 'PAYMENT':
            this.accountings.push(elm);
            break;
          case 'COMPLETED':
            this.completed.push(elm);
            break;
          case 'CANCEL':
            this.completed.push(elm);
            break;
          default:
            this.waitings.push(elm);
        }
      });
    }

    // 指定のIDのチケットのステートを変更する
    change(list, id, status) {
      list.forEach((item) => {
        if (item.id === id) {
          item.state = status;
        }
      });
    }
  }

  TicketListController.$inject = ['$state', '$stateParams', 'toaster', 'ClinicTicket', 'ClinicTicketStatus', 'clinic', 'tickets'];
  angular.module('petzApp')
    .controller('TicketListController', TicketListController);

})();
