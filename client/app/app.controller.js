(() => {
  'use strict';

  class AppController {
    constructor($scope, $state, $timeout, $window, $mdMedia, $mdSidenav, Auth) {
      this.$scope = $scope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$window = $window;
      this.$mdMedia = $mdMedia;
      this.$mdSidenav = $mdSidenav;
      this.Auth = Auth;
      this.account = Auth.getCurrentUser();
    }

    // history backを使って前の画面に戻る
    goBack() {
      this.$window.history.back();
    }

    // getTitle() {
    //   var title = '';
    //   title = (this.$state.includes('app.dashboard')) ? 'ダッシュボード' : title;
    //   title = (this.$state.includes('app.dashboard.customer')) ? '飼い主さま' : title;
    //   title = (this.$state.includes('app.dashboard.chart')) ? 'カルテ' : title;
    //   title = (this.$state.includes('app.dashboard.ticket')) ? 'チケット' : title;
    //   title = (this.$state.includes('app.dashboard.calendar')) ? 'カレンダー' : title;
    //   title = (this.$state.includes('app.dashboard.mail')) ? 'メール' : title;
    //   return title;
    // }
    // サイドバーをダッシュボードメニューにするか？
    // showMainMenuIcon() {
    //   return this.showMainMenu() && !this.$mdMedia('gt-sm');
    // }
    // showDashboardMenuIcon() {
    //   return this.showDashboardMenu() && !this.$mdMedia('gt-sm');
    // }

    // @deprecated
    showMainMenu() {
      return this.$state.includes('app.main');
    }
    // @deprecated
    showDashboardMenu() {
      return this.$state.includes('app.dashboard');
    }

    // アカウントメニューを表示する
    // openMenu($mdOpenMenu, ev) {
    //   $mdOpenMenu(ev);
    // }

    // サインアウトする
    signout() {
      this.Auth.logout();
      this.$state.go('app.signin', {}, {reload: true});
    }

    // サインインしているかどうかチェックする
    isSignin() {
      return this.Auth.isLoggedIn();
    }

    // メインストリームのページ配下であるかチェックする
    isMainPage() {
      return this.$state.includes('app.main');
    }

    // 動物病院向けページ配下であるかチェックする
    isClinicPage() {
      return this.$state.includes('app.dashboard');
    }

    // サイドメニューを開く
    // toggleMainMenu() {
    //   return this.debounce('mainmenu', 200);
    // }
    // toggleLeft() {
    //   return this.debounce('left', 200);
    // }
    //
    // closeLeft() {
    //   this.$mdSidenav('left').close()
    //     .then(() => console.log('close LEFT is done'));
    // }
    // debounce(name, wait) {
    //   var timer;
    //   this.$timeout.cancel(timer);
    //   timer = this.$timeout(() => {
    //     timer = undefined;
    //     this.$mdSidenav(name).toggle();
    //   }, wait || 10);
    // }
  }

  AppController.$inject = ['$scope', '$state', '$timeout', '$window', '$mdMedia', '$mdSidenav', 'Auth'];
  angular.module('petzApp')
    .controller('AppController', AppController);

})();
