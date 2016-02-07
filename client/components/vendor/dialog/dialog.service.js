(()=> {
  'use strict';

  class DialogService {
    constructor($mdDialog) {
      this.dialog = $mdDialog;
    }

    confirm(event, title, message) {
      var confirm = this.dialog.confirm()
        .targetEvent(event)
        .title(title)
        .textContent(message)
        .ok('OK')
        .cancel('CANCEL');
      return this.dialog.show(confirm);
    }

    delete(event) {
      return this.confirm(event, '削除しても良いですか？', '一度削除すると元に戻すことはできません。本当に削除しますか？');
    }
  }

  DialogService.$inject = ['$mdDialog'];
  angular.module('petz.vendor')
    .service('dialog', DialogService);

})();
