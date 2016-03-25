(()=> {
  'use strict';

  class DialogService {
    constructor($mdDialog, $mdMedia) {
      this.$mdDialog = $mdDialog;
      this.$mdMedia = $mdMedia;
    }

    confirm(event, title, message) {
      var confirm = this.$mdDialog.confirm()
        .targetEvent(event)
        .title(title)
        .textContent(message)
        .ok('OK')
        .cancel('CANCEL');
      return this.$mdDialog.show(confirm);
    }

    delete(event) {
      return this.confirm(event, '削除しても良いですか？', '一度削除すると元に戻すことはできません。本当に削除しますか？');
    }

    show(options) {
      var useFullScreen = this.$mdMedia('sm') || this.$mdMedia('xs');
      options.parent = angular.element(document.body);
      options.fullscreen = useFullScreen;
      options.clickOutsideToClose = true;
      return this.$mdDialog.show(options);
    }

    hide(object) {
      return this.$mdDialog.hide(object);
    }

    cancel() {
      this.$mdDialog.cancel();
    }
  }

  DialogService.$inject = ['$mdDialog', '$mdMedia'];
  angular.module('petz.vendor')
    .service('dialog', DialogService);

})();
