(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('VaccineDetailController', VaccineDetailController);

  VaccineDetailController.$inject = ['$state', '$stateParams', 'Notify', 'ClinicVaccine', 'vaccine'];
  function VaccineDetailController($state, $stateParams, Notify, ClinicVaccine, vaccine) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.vaccine = vaccine;
      _this.remove = remove;
    }

    // ワクチンを削除する
    function remove(vaccine) {
      Notify.del(function() {
        ClinicVaccine.remove({clinicId: $stateParams.clinicId, vaccineId: vaccine.id}).$promise
          .then(function() {
            $state.go('app.dashboard.vaccine');
            Notify.success('指定された予防接種ワクチンを削除しました。');
          });
      });
    }

    constructor();
  }
})();
