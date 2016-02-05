(function() {
  'use strict';

  routesConfig.$inject = ['$stateProvider'];
  function routesConfig($stateProvider){
    $stateProvider
      .state('app.dashboard.customer', {
        url: '^/clinics/:clinicId/customers',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/customer/customer.html',
            controller:   'CustomerController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          customers:      getCustomers
        }
      })
    ;
  }

  function getCustomers() {
    return [
      {id:1, firstName:'太郎', lastName:'山田', zipCode:'123-0000', address:'東京都新宿区歌舞伎町１−１−１', user:{login:'hoge@example.com'}},
      {id:2, firstName:'二郎', lastName:'斎藤', zipCode:'123-0000', address:'東京都新宿区歌舞伎町１−１−１', user:{login:'hoge@example.com'}},
      {id:3, firstName:'三四郎', lastName:'後藤', zipCode:'123-0000', address:'東京都新宿区歌舞伎町１−１−１', user:{login:'hoge@example.com'}},
      {id:4, firstName:'五郎', lastName:'野口', zipCode:'123-0000', address:'東京都新宿区歌舞伎町１−１−１', user:{login:'hoge@example.com'}}
    ];
  }

  angular.module('petzApp')
    .config(routesConfig);

})();
