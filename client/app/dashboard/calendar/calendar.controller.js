(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('TicketCalendarController', TicketCalendarController);

  TicketCalendarController.$inject = ['$state', '$stateParams', 'Modal', 'ClinicTicket'];
  function TicketCalendarController($state, $stateParams, Modal, ClinicTicket) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.viewCalendar = 'month';
      _this.calendarDay = new Date();
      _this.calendarTitle = 'hoge';

      getTodaysSchedules(_this.calendarDay);

      _this.getTodaysSchedules = getTodaysSchedules;
      _this.showEventDetail = showEventDetail;
    }

    function convertScheduleToEvent(element) {
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

    function convertSchedulesToEvents(response) {
      if (!response.data || response.data.length === 0) {
        _this.events = [];
      } else {
        _this.events = response.data.map(function(element) {
          return convertScheduleToEvent(element);
        });
      }
    }

    // 指定した月のスケジュールをロードする
    function getTodaysSchedules(today) {
      ClinicTicket.fetch({clinicId:$stateParams.clinicId, year:today.getFullYear(), month:today.getMonth() + 1}).$promise
        .then(convertSchedulesToEvents);
    }

    // 指定したイベントの詳細をモーダルに表示する
    function showEventDetail(event) {
      Modal.open('app/dashboard/common/event/event-modal.html', 'EventModalController', 'ctrl', {ticket: function() {return event.schedule;}}).result
        .then(function(data) {
          if (data) {
            _this.events.some(function(v, i) {
              if (v.schedule.id === event.schedule.id) {
                _this.events.splice(i, 1);
              }
            });
            if (!data.removed) {
              _this.events.push(convertScheduleToEvent(data));
            }
          }
        });
    }

    constructor();
  }
})();
