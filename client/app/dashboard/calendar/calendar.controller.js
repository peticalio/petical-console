(() => {
  'use strict';

  class CalendarController {
    constructor($state, $stateParams, ClinicTicket, clinic) {
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.ClinicTicket = ClinicTicket;
      this.clinic = clinic;

      this.viewCalendar = 'month';
      this.today = new Date();
      this.getTodaysSchedules(this.today);
    }

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
        title: element.chart.pet.name + 'ちゃん (' + element.chart.customer.user.lastName + ' ' + element.chart.customer.user.firstName + ' 様)',
        type: type,
        startsAt: element.startDateTime,
        endsAt: element.endDateTime,
        editable: true,
        deletable: true,
        draggable: true,
        resizable: true,
        schedule: element
      };
    }

    convertSchedulesToEvents(response) {
      if (!response.data || response.data.length === 0) {
        this.events = [];
      } else {
        this.events = response.data.map(function(element) {
          return this.convertScheduleToEvent(element);
        });
      }
    }

    // 指定した月のスケジュールをロードする
    getTodaysSchedules(today) {
      this.ClinicTicket.fetch({clinicId: this.clinic.id, year: today.getFullYear(), month: today.getMonth() + 1}).$promise
        .then((response) => this.convertSchedulesToEvents(response));
    }

    // 指定したイベントの詳細をモーダルに表示する
    // showEventDetail(event) {
    //   Modal.open('app/dashboard/common/event/event-modal.html', 'EventModalController', 'ctrl', {ticket: function() {return event.schedule;}}).result
    //     .then(function(data) {
    //       if (data) {
    //         _this.events.some(function(v, i) {
    //           if (v.schedule.id === event.schedule.id) {
    //             _this.events.splice(i, 1);
    //           }
    //         });
    //         if (!data.removed) {
    //           _this.events.push(convertScheduleToEvent(data));
    //         }
    //       }
    //     });
    // }
  }

  CalendarController.$inject = ['$state', '$stateParams', 'ClinicTicket', 'clinic'];
  angular.module('petzApp')
    .controller('CalendarController', CalendarController);

})();
