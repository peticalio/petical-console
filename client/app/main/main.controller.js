(()=> {
  'use strict';

  class MainController {
    constructor($state, Auth) {
      this.state = $state;
      this.Auth = Auth;
      this.account = Auth.getCurrentUser();
    }

    // サイドバーをメインメニューにするか？
    showMainMenu() {
      return this.state.includes('app.home');
    }

    // サイドバーをダッシュボードメニューにするか？
    showDashboardMenu() {
      return this.state.includes('app.dashboard');
    }

    // アカウントメニューを表示する
    openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }

    // サインアウトする
    signout() {
      this.Auth.logout();
      this.state.go('app.signin', {}, {reload: true});
    }
  }

  MainController.$inject = ['$state', 'Auth'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
