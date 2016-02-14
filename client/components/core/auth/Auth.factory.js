(function() {
  'use strict';

  angular
    .module('petz.core')
    .service('Auth', AuthService);

  AuthService.$inject = ['$location', '$rootScope', '$http', 'MyAccount', '$cookieStore', '$q', 'Base64', 'api'];
  function AuthService($location, $rootScope, $http, MyAccount, $cookieStore, $q, Base64, api) {
    // ----- variables
    var _this = this;

    // ----- methods
    function constructor() {
      if ($cookieStore.get('token')) {
        _this.currentUser = MyAccount.get();
      }

      _this.login = login;
      _this.logout = logout;
      _this.refresh = refresh;
      _this.createUser = createUser;
      _this.isLoggedIn = isLoggedIn;

      // deprecated
      _this.getCurrentUser = getCurrentUser;
    }

    function login(user, callback) {
      return authenticate(user, callback)
        .then(function(token) {
          _this.currentUser = MyAccount.get();
          return $q.resolve(_this.currentUser);
        });
    }

    function authenticate(user, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      var data = 'username=' + encodeURIComponent(user.email) + '&password=' + encodeURIComponent(user.password) + '&grant_type=password&scope=read%20write&' + 'client_secret=mySecretOAuthSecret&client_id=majimenatestapp';
      return $http.post(
        api.domain + '/oauth/token',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Base64.encode('majimenatestapp' + ':' + 'mySecretOAuthSecret')
          }
        })
        .success(function(token) {
          var expiredAt = new Date();
          expiredAt.setSeconds(expiredAt.getSeconds() + token.expires_in);
          token.expires_at = expiredAt.getTime();
          $cookieStore.put('token', token);
          deferred.resolve($cookieStore.get('token'));
          return cb();
        })
        .error(function(err) {
          logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
    }

    function refresh() {
      var token = $cookieStore.get('token');
      var data = 'refresh_token=' + token.refresh_token + '&grant_type=refresh_token&client_id=majimenatestapp&client_secret=mySecretOAuthSecret';
      return $http.post(api.domain + '/oauth/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Basic ' + Base64.encode('majimenatestapp' + ':' + 'mySecretOAuthSecret')
        }})
        .success(function(token) {
          console.log(token);
          var expiredAt = new Date();
          expiredAt.setSeconds(expiredAt.getSeconds() + token.expires_in);
          token.expires_at = expiredAt.getTime();
          $cookieStore.put('token', token);
          deferred.resolve($cookieStore.get('token'));
          return cb();
        })
        .error(function(err) {
          logout();
          deferred.reject(err);
          return cb(err);
        });
    }

    function logout() {
      $cookieStore.remove('token');
      _this.currentUser = null;
    }

    function createUser(user, callback) {
      var cb = callback || angular.noop;

      return Account.save(user,
        function(data) {
          console.log(data);
          return cb(user);
          // $cookieStore.put('token', data.token);
          // currentUser = User.get();
          // return cb(user);
        },
        function(err) {
          logout();
          return cb(err);
        }.bind(this)).$promise
        .then(function() {
          return login(user);
        });
    }

    function changePassword(oldPassword, newPassword, callback) {
      var cb = callback || angular.noop;

      return Account.changePassword({
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(user) {
        return cb(user);
      }, function(err) {
        return cb(err);
      }).$promise;
    }

    // ログイン中のユーザを取得する
    function getCurrentUser() {
      return _this.currentUser;
    }

    // トークンがあるかどうかを調べる
    function isLoggedIn() {
      var token = $cookieStore.get('token');
      return !angular.isUndefined(token) && token !== null;
    }

    // function isLoggedInAsync(cb) {
    //   // if(currentUser.hasOwnProperty('$promise')) {
    //   //   currentUser.$promise.then(function() {
    //   //     cb(true);
    //   //   }).catch(function() {
    //   //     cb(false);
    //   //   });
    //   // } else if(currentUser.hasOwnProperty('authorities')) {
    //   //   cb(true);
    //   // } else {
    //   //   cb(false);
    //   // }
    //   return cb();
    // }

    // function isAdmin() {
    //   var roles = currentUser.authorities;
    //   if (roles) {
    //     return roles.indexOf('ROLE_ADMIN' >= 0);
    //   }
    //   return false;
    // }

    // function getToken = function() {
    //   return $cookieStore.get('token');
    // }

    constructor();
  }
})();