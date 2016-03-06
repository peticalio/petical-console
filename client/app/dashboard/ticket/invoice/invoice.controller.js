(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('InvoiceController', InvoiceController);

  InvoiceController.$inject = ['$scope', '$state', '$stateParams', 'Modal', 'Notify', 'ClinicInvoice', 'invoice', 'examinations', 'clinic'];
  function InvoiceController($scope, $state, $stateParams, Modal, Notify, ClinicInvoice, invoice, examinations, clinic) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.clinic = clinic;
      _this.invoice = invoice;
      _this.examinations = examinations;
      _this.cancel = cancel;
      _this.showAccountingModal = showAccountingModal;
    }

    // 請求書をキャンセルする
    function cancel() {
      ClinicInvoice.remove({clinicId:clinic.id, invoiceId:invoice.id}).$promise
        .then(function(response) {
          Notify.success('請求書をキャンセルしました。再度作成してください。');
        });
    }

    // 会計モーダルを表示する
    function showAccountingModal(invoice) {
      var request = {invoice: function() {return invoice;}, clinic: function() {return clinic;}};
      Modal.open('app/dashboard/ticket/accounting/accounting-modal.html', 'AccountingModalController', 'ctrl', request).result
        .then(function(response) {
          _this.invoice = response;
        });
    }

    constructor();
  }
})();
