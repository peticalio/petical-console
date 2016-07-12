(() => {
  'use strict';

  function empty() {
    return {country:'JP'};
  }

  function ClinicRouter($stateProvider){
    $stateProvider
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
        ncyBreadcrumb: {
          label: '動物病院の登録'
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
