(() => {
  'use strict';

  function empty() {
    return {country:'JP'};
  }

  function ClinicRouter($stateProvider){
    $stateProvider
      // register new clinic
      .state('app.main.clinic', {
        abstract:         true
      })
      .state('app.main.clinic.form', {
        authenticate:     true,
        url:              '^/clinics/form',
        views: {
          '@app': {
            templateUrl:  'app/main/clinic/form/form.html',
            controller:   'ClinicFormController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          clinic:         empty
        }
      })
    ;
  }

  ClinicRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(ClinicRouter);

})();
