(() => {
  'use strict';

  function getClinicStaffs(clinic, ClinicStaff) {
    return ClinicStaff.query({clinicId: clinic.id}).$promise
      .then((response) => response);
  }

  function getClinicStaff($stateParams, clinic, ClinicStaff) {
    return ClinicStaff.load({clinicId: clinic.id, staffId: $stateParams.staffId}).$promise
      .then((response) => response);
  }

  function StaffRouter($stateProvider){
    $stateProvider
      .state('app.dashboard.staff', {
        abstract: true,
        url: '^/clinics/:clinicId/staffs'
      })
      // スタッフ一覧
      .state('app.dashboard.staff.list', {
        url: '/list',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/staff/list/list.html',
            controller:   'StaffListController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          staffs: getClinicStaffs
        }
      })
      // スタッフ登録フォーム
      .state('app.dashboard.staff.form', {
        url: '/form',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/staff/form/form.html',
            controller:   'StaffFormController',
            controllerAs: 'ctrl'
          }
        }
      })
      // スタッフ詳細フォーム
      .state('app.dashboard.staff.detail', {
        url: '/:staffId',
        views: {
          '@app': {
            templateUrl:  'app/dashboard/staff/detail/detail.html',
            controller:   'StaffDetailController',
            controllerAs: 'ctrl'
          }
        },
        resolve: {
          staff: getClinicStaff
        }
      })
    ;
  }

  StaffRouter.$inject = ['$stateProvider'];
  angular.module('petzApp')
    .config(StaffRouter);

})();
