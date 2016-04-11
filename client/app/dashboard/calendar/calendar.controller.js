(() => {
  'use strict';

  class CalendarController {
    constructor($state, ClinicTicket, clinic) {
      this.$state = $state;
      this.ClinicTicket = ClinicTicket;
      this.clinic = clinic;

      this.viewCalendar = 'month';
      this.today = new Date();
      this.refresh(this.today);
    }

    // 指定した月のチケットをロードする
    refresh(today) {
      this.ClinicTicket.fetch({clinicId: this.clinic.id, year: today.getFullYear(), month: today.getMonth() + 1}).$promise
        .then((response) => this.convertSchedulesToEvents(response));
    }

    // イベントデータに変換する（配列）
    convertSchedulesToEvents(response) {
      if (!response || response.length === 0) {
        this.events = [];
      } else {
        this.events = response.map((element) => {
          return this.convertScheduleToEvent(element);
        });
      }
    }

    // イベントデータに変換する（個別）
    convertScheduleToEvent(element) {
      var type = '';
      switch (element.state) {
        case 'RESERVED':
          type = 'info';
          break;
        case 'RECEIPTED':
          type = 'warning';
          break;
        case 'DOING':
          type = 'success';
          break;
        case 'PAYMENT':
          type = 'important';
          break;
        default:
          type = 'default';
      }
      return {
        title: element.chart.pet.name + 'ちゃん - ' + element.chart.customer.user.lastName + ' ' + element.chart.customer.user.firstName + ' 様',
        type: type,
        startsAt: element.startDateTime,
        endsAt: element.endDateTime,
        editable: false,
        deletable: false,
        draggable: false,
        resizable: false,
        ticket: element
      };
    }

    // 指定したイベントの詳細ページにリンクする
    showEventDetail(event) {
      this.$state.go('app.dashboard.ticket.detail', {clinicId: this.clinic.id, ticketId: event.ticket.id});
    }
  }

  CalendarController.$inject = ['$state', 'ClinicTicket', 'clinic'];
  angular.module('petzApp')
    .controller('CalendarController', CalendarController);

})();
