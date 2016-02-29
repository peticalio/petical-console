(() => {
  'use strict';

  class MainController {
    constructor($scope, $state, $timeout, $mdSidenav, Auth) {
      this.$scope = $scope;
      this.$state = $state;
      this.$timeout = $timeout;
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

    // アカウントメニューを表示する
    openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }

    // サインアウトする
    signout() {
      this.Auth.logout();
      this.$state.go('app.signin', {}, {reload: true});
    }

    toggleLeft() {
      this.buildDelayedToggler('left');
    }

    closeLeft() {
      this.$mdSidenav('left').close()
        .then(() => console.log('close LEFT is done'));
    }

    buildDelayedToggler(navID) {
      return this.debounce(() => {
        this.$mdSidenav(navID).toggle()
          .then(() => {
            console.log('toggle ' + navID + ' is done');
          });
      }, 200);
    }

    debounce(func, wait) {
      var timer;
      return function debounced() {
        var context = this.$scope;
        var args = Array.prototype.slice.call(arguments);
        this.$timeout.cancel(timer);
        timer = this.$timeout(() => {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
  }

  MainController.$inject = ['$scope', '$state', '$timeout', '$mdSidenav', 'Auth'];
  angular.module('petzApp')
    .controller('MainController', MainController);

})();
