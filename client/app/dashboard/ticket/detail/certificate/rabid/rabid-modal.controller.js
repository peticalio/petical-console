(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('RabidModalController', RabidModalController);

  RabidModalController.$inject = ['$uibModalInstance', 'ClinicTicketCertificate', 'clinic', 'ticket'];
  function RabidModalController($uibModalInstance, ClinicTicketCertificate, clinic, ticket) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.ticket = ticket;
      _this.closeDialog = closeDialog;
      _this.certificate = {vaccinatedDate: new Date()};

      _this.openedVaccinatedDate = false;
      _this.openVaccinatedDateDialog = openVaccinatedDateDialog;
      _this.save = save;
    }

    // 予防接種日選択ダイアログの表示制御
    function openVaccinatedDateDialog($event) {
      $event.stopPropagation();
      _this.openedVaccinatedDate = !_this.openedVaccinatedDate;
    }

    // ダイアログを閉じる（キャンセル）
    function closeDialog() {
      $uibModalInstance.dismiss('cancel');
    }

    // 予防接種情報を保存する
    function save(certificate) {
      certificate.type = 'RABID';
      certificate.ticket = ticket;
      ClinicTicketCertificate.save({clinicId:clinic.id, ticketId:ticket.id}, certificate).$promise
        .then(function(response) {
          $uibModalInstance.close(response.data);
        });
    }

    constructor();
  }
})();
