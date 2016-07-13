(()=> {
  'use strict';

  class DialogService {
    constructor($uibModal) {
      this.$uibModal = $uibModal;
    }

    confirm(event, title, message, action) {
      var modal = this.$uibModal.open({
        animation: true,
        templateUrl: 'confirm-modal.html',
        controller: 'ConfirmModalController',
        controllerAs: 'ctrl',
        resolve: {
          contents: function () {
            return {title:title, message:message, action:action};
          }
        }
      });
      return modal.result;
    }

    delete(event) {
      return this.confirm(event, '本当に削除してもよろしいですか？', '削除してしまったデータは元に戻すことができません。\n本当に削除してもよろしいですか？', '削除する');
    }
  }

  // 確認モーダルのコントローラ
  class ConfirmModalController {
    // コンストラクタ
    constructor($scope, $uibModalInstance, contents) {
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.contents = contents;
    }
    // OK時の処理
    execute() {
      this.$uibModalInstance.close();
    }
    // close時の処理
    close() {
      this.$uibModalInstance.dismiss('cancel');
    }
  }

  DialogService.$inject = ['$uibModal'];
  angular.module('petz.vendor')
    .service('dialog', DialogService);

  ConfirmModalController.$inject = ['$scope', '$uibModalInstance', 'contents'];
  angular.module('petz.vendor')
    .controller('ConfirmModalController', ConfirmModalController);

})();
