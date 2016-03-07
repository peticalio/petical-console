(() => {
  'use strict';

  function ClinicCalendarRouter($stateProvider) {
    $stateProvider
      .state('app.dashboard.calendar', {
        url: '^/clinics/:clinicId/calendar',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/calendar/calendar.html',
            controller:   'CalendarController',
            controllerAs: 'ctrl'
          }
        }
      })
    ;
  }

  ClinicCalendarRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicCalendarRouter);

})();
