(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('CertificateModalController', CertificateModalController);

  CertificateModalController.$inject = ['$uibModalInstance', 'ClinicTicketCertificate', 'ClinicVaccine', 'clinic', 'ticket'];
  function CertificateModalController($uibModalInstance, ClinicTicketCertificate, ClinicVaccine, clinic, ticket) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.ticket = ticket;
      _this.clinic = clinic;
      _this.vaccines = ClinicVaccine.query({clinicId:clinic.id});
      _this.certificate = {vaccinatedDate: new Date()};

      _this.closeDialog = closeDialog;
      _this.save = save;

      _this.openedVaccinateDate = false;
      _this.openVaccinatedDateDialog = openVaccinatedDateDialog;
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
      certificate.type = 'PREVENTION';
      certificate.ticket = ticket;
      ClinicTicketCertificate.save({clinicId:clinic.id, ticketId:ticket.id}, certificate).$promise
        .then(function(response) {
          $uibModalInstance.close(response.data);
        });
    }

    constructor();
  }
})();
