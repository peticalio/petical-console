(() => {
  'use strict';

  class TicketFormController {
    constructor($state, $stateParams, $filter, toaster, ClinicTicket, ClinicTicketStatus, timetable, ticket) {
      this.$state = $state;
      this.$filter = $filter;
      this.toaster = toaster;
      this.ClinicTicket = ClinicTicket;
      this.ClinicTicketStatus = ClinicTicketStatus;
      this.timetable = timetable;
      this.ticket = ticket;
      this.startTime = this.copyTime(ticket.startDateTime);
      this.endTime = this.copyTime(ticket.endDateTime);
      this.today = new Date();
    }

    copyTime(time) {
      if (time) {
        return this.$filter('date')(time, 'HH:mm');
      }
      return null;
    }

    // 開始日付が変更された時に終了日付も変更する
    copyStartDateTime(time) {
      var date = this.ticket.startDateTime;
      if (!date) {
        date = new Date();
      }
      this.ticket.startDateTime = this.changeTime(date, time);

      var et = new Date(date.getTime());
      et.setMinutes(et.getMinutes() + 60);
      this.ticket.endDateTime = et;
      this.endTime = this.copyTime(et);
    }

    // 時刻が変えられた時に指定されたDateオブジェクトの時分を変える
    changeTime(date, time) {
      if (!date) {
        date = new Date();
      }
      if (time) {
        var st = time.split(':');
        date.setHours(st[0]);
        date.setMinutes(st[1]);
      }
      return date;
    }

    // チケットを作成する
    save(ticket) {
      this.ClinicTicket.save({clinicId: ticket.clinic.id}, ticket).$promise
        .then(() => {
          return this.ClinicTicket.fetch({clinicId: ticket.clinic.id}).$promise;
        })
        .then(() => {
          this.toaster.info('新しいチケットを作成しました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId: ticket.clinic.id, chartId: ticket.chart.id});
        });
    }

    // チケットを更新する
    update(ticket) {
      this.ClinicTicket.update({clinicId: ticket.clinic.id, ticketId: ticket.id}, ticket).$promise
        .then(() => {
          this.toaster.info('チケットを更新しました。');
          this.$state.go('app.dashboard.ticket.detail', {clinicId: ticket.clinic.id, ticketId: ticket.id});
        });
    }

    // チケットを削除する
    delete(ticket) {
      this.ClinicTicket.remove({clinicId: ticket.clinic.id, ticketId: ticket.id}).$promise
        .then(() => {
          return this.ClinicTicket.fetch({clinicId: ticket.clinic.id}).$promise;
        })
        .then(() => {
          this.toaster.info('チケットを削除しました。');
          this.$state.go('app.dashboard.ticket.list', {clinicId: ticket.clinic.id});
        });
    }
  }

  TicketFormController.$inject = ['$state', '$stateParams', '$filter', 'toaster', 'ClinicTicket', 'ClinicTicketStatus', 'timetable', 'ticket'];
  angular.module('petzApp')
    .controller('TicketFormController', TicketFormController);

})();
