(() => {
  'use strict';

  class TicketFormController {
    constructor($state, $filter, toaster, ClinicTicket, timetable, ticket) {
      this.$state = $state;
      this.$filter = $filter;
      this.toaster = toaster;
      this.ClinicTicket = ClinicTicket;
      this.timetable = timetable;
      this.ticket = ticket;
      this.setupInitialDateTime();
    }

    // フォームに初期値をセットアップする
    setupInitialDateTime() {
      var date = new Date();
      this.ticket.startDateTime = date;
      this.ticket.endDateTime = date;
      this.startTime = this.calcNearTime(date);
      date.setMinutes(date.getMinutes() + 60);
      this.endTime = this.calcNearTime(date);
    }

    // 直近で入れるべき予約時刻を計算する
    calcNearTime(date) {
      var calc = new Date(date.getTime());
      calc.setMinutes(calc.getMinutes() + 60);
      var hour = this.$filter('date')(calc, 'HH');
      return hour + ':00';
    }

    // 日付オブジェクトに指定時刻（HH:mm）を設定する
    calcDateTime(date, time) {
      var calc = new Date(date.getTime());
      var st = time.split(':');
      calc.setHours(st[0]);
      calc.setMinutes(st[1]);
      return calc;
    }

    // チケットを作成する
    save(ticket) {
      // 開始日時と終了日時を算出
      ticket.startDateTime = this.calcDateTime(ticket.startDateTime, this.startTime);
      ticket.endDateTime = this.calcDateTime(ticket.endDateTime, this.endTime);
      // サーバに保存
      this.ClinicTicket.save({clinicId:ticket.clinic.id}, ticket).$promise
        .then(() => {
          this.toaster.info('新しいチケットを作成しました。');
          this.$state.go('app.dashboard.chart.detail', {clinicId:ticket.clinic.id, chartId:ticket.chart.id}, {reload:true});
        });
    }

    // チケットを更新する
    update(ticket) {
      // 開始日時と終了日時を算出
      ticket.startDateTime = this.calcDateTime(ticket.startDateTime, this.startTime);
      ticket.endDateTime = this.calcDateTime(ticket.endDateTime, this.endTime);
      // サーバに保存
      this.ClinicTicket.update({clinicId: ticket.clinic.id, ticketId: ticket.id}, ticket).$promise
        .then(() => {
          this.toaster.info('チケットを更新しました。');
          this.$state.go('app.dashboard.ticket.detail', {clinicId: ticket.clinic.id, ticketId: ticket.id}, {reload:true});
        });
    }
  }

  TicketFormController.$inject = ['$state', '$filter', 'toaster', 'ClinicTicket', 'timetable', 'ticket'];
  angular.module('petzApp')
    .controller('TicketFormController', TicketFormController);

})();
