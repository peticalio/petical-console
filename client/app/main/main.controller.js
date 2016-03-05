(() => {
  'use strict';

  class MainController {
    constructor($scope, $state, $timeout, $mdMedia, $mdSidenav, Auth) {
      this.$scope = $scope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$mdMedia = $mdMedia;
      this.$mdSidenav = $mdSidenav;
      this.Auth = Auth;
      this.account = Auth.getCurrentUser();
    }

    // サイドバーをダッシュボードメニューにするか？
    showMainMenuIcon() {
      return this.showMainMenu() && !this.$mdMedia('gt-sm');
    }
    showDashboardMenuIcon() {
      return this.showDashboardMenu() && !this.$mdMedia('gt-sm');
    }

    showMainMenu() {
      return this.$state.includes('app.home') || this.$state.includes('app.clinic');
    }
    showDashboardMenu() {
      return this.$state.includes('app.dashboard');
    }

    // アカウントメニューを表示する
    openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }

    // サインアウトする
    signout() {
      this.Auth.logout();
      this.$state.go('app.signin', {}, {reload: true});
    }

    // サイドメニューを開く
    toggleMainMenu() {
      return this.debounce('mainmenu', 200);
    }
    toggleLeft() {
      return this.debounce('left', 200);
    }

    closeLeft() {
      this.$mdSidenav('left').close()
        .then(() => console.log('close LEFT is done'));
    }

    debounce(name, wait) {
      var timer;
      this.$timeout.cancel(timer);
      timer = this.$timeout(() => {
        timer = undefined;
        this.$mdSidenav(name).toggle();
      }, wait || 10);
    }
  }

  MainController.$inject = ['$scope', '$state', '$timeout', '$mdMedia', '$mdSidenav', 'Auth'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
