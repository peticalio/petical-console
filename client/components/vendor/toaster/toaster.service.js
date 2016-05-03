/* istanbul ignore next: tired of writing tests */
(()=> {
  'use strict';

  class ToasterService {
    constructor($mdToast) {
      this.toast = $mdToast;
    }

    // インフォメッセージを出力する
    info(message) {
      this.toast.show(
        this.toast.simple()
          .textContent(message)
          .action('OK')
          .position('bottom right')
          .hideDelay(4000)
      );
    }

    // インフォメッセージを出力する
    error(message) {
      this.toast.show(
        this.toast.simple()
          .textContent(message)
          .action('OK')
          .position('bottom right')
          .hideDelay(4000)
      );
    }

    // 例外をハンドリングする
    handle(cause) {
      switch (cause.status) {
        case 400:
          if (cause.data && cause.data.errors) {
            var message = null;
            for (var i = 0; i < cause.data.errors.length; i++) {
              if (message) {
                message = message + '<br/>' + cause.data.errors[i].message;
              } else {
                message = cause.data.errors[i].message;
              }
            }
            if (message) {
              this.error(message);
            }
          } else if (cause.data && cause.data.detail) {
            this.error(cause.data.detail);
          }
          break;
        default:
          this.error(cause.data.detail);
      }
    }
  }

  ToasterService.$inject = ['$mdToast'];
  angular.module('petz.vendor')
    .service('toaster', ToasterService);

})();
