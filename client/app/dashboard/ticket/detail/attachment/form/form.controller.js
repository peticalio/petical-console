(function() {
  'use strict';

  angular
    .module('petzApp')
    .controller('TicketDetailExaminationFormController', TicketDetailExaminationFormController);

  TicketDetailExaminationFormController.$inject = ['$state', '$uibModalInstance', 'ExceptionHandler', 'Product', 'ClinicExamination', 'examination'];
  function TicketDetailExaminationFormController($state, $uibModalInstance, ExceptionHandler, Product, ClinicExamination, examination) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      _this.examination = examination;
      _this.clinic = examination.ticket.clinic;
      _this.products = Product.fetch({clinicId:_this.clinic.id});

      _this.closeDialog = closeDialog;
      _this.selectProduct = selectProduct;
      _this.save = save;
      _this.remove = remove;
    }

    // ダイアログを閉じる（キャンセル）
    function closeDialog() {
      $uibModalInstance.dismiss('cancel');
    };

    function selectProduct(product) {
      _this.examination.name = product.name;
      _this.examination.price = product.price;
      _this.examination.taxType = product.taxType;
      _this.examination.taxRate = product.taxRate;
      _this.examination.quantity = 1;
    };

    // 既に登録されているデータの場合は更新し、そうでなければ新規作成する
    function save(examination) {
      if (examination.id) {
        ClinicExamination.update({clinicId:_this.clinic.id, ticketId:examination.ticket.id, examinationId:examination.id}, examination).$promise
          .then(function(response) {$uibModalInstance.close(response.data);})
          .catch(ExceptionHandler.handle);
      } else {
        examination.examinationDateTime = new Date();
        ClinicExamination.save({clinicId:_this.clinic.id, ticketId:examination.ticket.id}, examination).$promise
          .then(function(response) {$uibModalInstance.close(response.data);})
          .catch(ExceptionHandler.handle);
      }
    };

    // 指定した診察内容を削除する
    function remove(examination) {
      examination.removed = true;
      ClinicExamination.remove({clinicId:examination.clinic.id, ticketId:examination.ticket.id, examinationId:examination.id}).$promise
        .then(function() {$uibModalInstance.close(examination);})
        .catch(ExceptionHandler.handle);
    };

    constructor();
  }
})();
