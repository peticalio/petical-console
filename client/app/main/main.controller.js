(()=> {
  'use strict';

  class MainController {
    constructor($state) {
      this.state = $state;
    }

    // サイドバーをメインメニューにするか？
    showMainMenu() {
      return this.state.includes('app.home');
    }

    // サイドバーをダッシュボードメニューにするか？
    showDashboardMenu() {
      return this.state.includes('app.dashboard');
    }

    openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }
  }

  MainController.$inject = ['$state'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
