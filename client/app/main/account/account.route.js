(() => {
  'use strict';

  function AccountRouter($stateProvider){
    $stateProvider
      .state('app.main.account', {
        abstract:         true,
        url:              '^/account'
      })
      .state('app.main.account.form', {
        url:              '/form',
        views: {
          '@app': {
            templateUrl:  'app/main/account/form/form.html',
            controller:   'AccountFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: 'アカウント変更'
        }
      })
      .state('app.main.account.password', {
        url:              '/password/form',
        views: {
          '@app': {
            templateUrl:  'app/main/account/password/form.html',
            controller:   'AccountPasswordFormController',
            controllerAs: 'ctrl'
          }
        },
        ncyBreadcrumb: {
          label: 'パスワード変更'
        }
      })
    ;
  }

  AccountRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(AccountRouter);

})();
