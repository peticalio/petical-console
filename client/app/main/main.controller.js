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

    // サイドバーをメインメニューにするか？
    showMainMenu() {
      return this.$state.includes('app.home');
    }

    // サイドバーをダッシュボードメニューにするか？
    showDashboardMenu() {
      return this.$state.includes('app.dashboard');
    }

    // サイドバーのトグルアイコンを表示するか？
    showDashbordMenuIcon() {
      return this.$mdMedia('xs');
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
    toggleLeft() {
      var func = function() {
        this.$mdSidenav('left').toggle();
      };
      return this.debounce(func, 200);
    }

    closeLeft() {
      this.$mdSidenav('left').close()
        .then(() => console.log('close LEFT is done'));
    }

    debounce(func, wait) {
      var timer;
      this.$timeout.cancel(timer);
      timer = this.$timeout(() => {
        timer = undefined;
        this.$mdSidenav('left').toggle();
      }, wait || 10);
    }
  }

  MainController.$inject = ['$scope', '$state', '$timeout', '$mdMedia', '$mdSidenav', 'Auth'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
