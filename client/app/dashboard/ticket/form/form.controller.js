(() => {
  'use strict';

  class TicketFormController {
    constructor($state, $filter, toaster, ClinicTicket, ClinicChartTicket, timetable, clinic, ticket) {
      this.$state = $state;
      this.$filter = $filter;
      this.toaster = toaster;
      this.ClinicTicket = ClinicTicket;
      this.ClinicChartTicket = ClinicChartTicket;
      this.timetable = timetable;
      this.clinic = clinic;
      this.ticket = ticket;
      this.setupInitialDateTime();
    }

    // フォームに初期値をセットアップする
    setupInitialDateTime() {
      if (!this.ticket.id) {
        // 新規登録時は自動計算した日付を入れる
        var date = new Date();
        this.ticket.startDateTime = date;
        this.startTime = this.calcNearTime(date);
        this.ticket.endDateTime = date;
        date.setMinutes(date.getMinutes() + 60);
        this.endTime = this.calcNearTime(date);
      } else {
        // 更新時は入力されている値を入れる
        this.startTime = this.getTime(this.ticket.startDateTime);
        this.endTime = this.getTime(this.ticket.endDateTime);
      }
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

    // 日付に変える
    getTime(date) {
      return this.$filter('date')(date, 'HH:mm');
    }

    // チケットを作成する
    save(ticket) {
      // 開始日時と終了日時を算出
      ticket.startDateTime = this.calcDateTime(ticket.startDateTime, this.startTime);
      ticket.endDateTime = this.calcDateTime(ticket.endDateTime, this.endTime);
      // サーバに保存
      this.ClinicTicket.save({clinicId:ticket.clinic.id}, ticket).$promise
        .then((response) => {
          this.toaster.info('チケットを作成しました。');
          this.ClinicChartTicket.clear({clinicId:ticket.clinic.id, chartId:ticket.chart.id}); // キャッシュクリア
          this.$state.go('app.dashboard.ticket.detail', {clinicId:ticket.clinic.id, ticketId:response.data.id});
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
          this.toaster.info('チケットの内容を変更しました。');
          this.$state.go('app.dashboard.ticket.detail', {clinicId: ticket.clinic.id, ticketId: ticket.id});
        });
    }
  }

  TicketFormController.$inject = ['$state', '$filter', 'toaster', 'ClinicTicket', 'ClinicChartTicket', 'timetable', 'clinic', 'ticket'];
  angular.module('petzApp')
    .controller('TicketFormController', TicketFormController);

})();
