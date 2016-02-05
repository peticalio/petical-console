(function() {
  'use strict';

  angular
    .module('petzApp')
    .service('Auth', AuthService);

  AuthService.$inject = ['$location', '$rootScope', '$http', 'MyAccount', '$cookieStore', '$q', 'Base64', 'localStorageService', 'Clinic', 'CONFIG'];
  function AuthService($location, $rootScope, $http, MyAccount, $cookieStore, $q, Base64, localStorageService, Clinic, CONFIG) {
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
        CONFIG.server + '/oauth/token',
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
      return $http.post(CONFIG.server + '/oauth/token', data, {
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
      localStorageService.clearAll();
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

//
// 'use strict';
//
// angular.module('petzApp')
//   .factory('Auth', function Auth($location, $rootScope, $http, Account, $cookieStore, $q, Base64, localStorageService, Clinic, CONFIG) {
//     var service = {};
//
//     var currentUser = null;
//     if($cookieStore.get('token')) {
//       currentUser = Account.get();
//     }
//
//       /**
//        * Authenticate user and save token
//        *
//        * @param  {Object}   user     - login info
//        * @param  {Function} callback - optional
//        * @return {Promise}
//        */
//       service.login = function(user, callback) {
//         // var cb = callback || angular.noop;
//         // var deferred = $q.defer();
//         //
//         // var data = 'username=' + user.email + '&password=' + user.password + '&grant_type=password&scope=read%20write&' + 'client_secret=mySecretOAuthSecret&client_id=majimenatestapp';
//         // return $http.post(CONFIG.server + '/oauth/token', data, {
//         //   headers: {
//         //     'Content-Type': 'application/x-www-form-urlencoded',
//         //     'Accept': 'application/json',
//         //     'Authorization': 'Basic ' + Base64.encode('majimenatestapp' + ':' + 'mySecretOAuthSecret')
//         //   }})
//         //   .success(function (response) {
//         //     var expiredAt = new Date();
//         //     expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
//         //     response.expires_at = expiredAt.getTime();
//         //
//         //     $cookieStore.put('token', response);
//         //     currentUser = Account.get();
//         //
//         //     deferred.resolve(response);
//         //     return cb();
//         //   })
//         //   .error(function(err) {
//         //     service.logout();
//         //     deferred.reject(err);
//         //     return cb(err);
//         //   }
//         //   .bind(this));
//         //
//         // return deferred.promise;
//         return service.authenticate(user, callback)
//           .then(function(token) {
//             currentUser = Account.get();
//             return $q.resolve(currentUser);
//           });
//       };
//
//       service.authenticate = function(user, callback) {
//         var cb = callback || angular.noop;
//         var deferred = $q.defer();
//
//         var data = 'username=' + encodeURIComponent(user.email) + '&password=' + encodeURIComponent(user.password) + '&grant_type=password&scope=read%20write&' + 'client_secret=mySecretOAuthSecret&client_id=majimenatestapp';
//         console.log(data);
//         return $http.post(
//           CONFIG.server + '/oauth/token',
//           data,
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Accept': 'application/json',
//               'Authorization': 'Basic ' + Base64.encode('majimenatestapp' + ':' + 'mySecretOAuthSecret')
//             }
//           })
//           .success(function(token) {
//             var expiredAt = new Date();
//             expiredAt.setSeconds(expiredAt.getSeconds() + token.expires_in);
//             token.expires_at = expiredAt.getTime();
//             $cookieStore.put('token', token);
//             deferred.resolve($cookieStore.get('token'));
//             return cb();
//           })
//           .error(function(err) {
//             service.logout();
//             deferred.reject(err);
//             return cb(err);
//           }.bind(this));
//
//         return deferred.promise;
//       };
//
//       /**
//        * Delete access token and user info
//        *
//        * @param  {Function}
//        */
//       service.logout = function() {
//         $cookieStore.remove('token');
//         localStorageService.clearAll();
//         currentUser = null;
//       };
//
//       /**
//        * Create a new user
//        *
//        * @param  {Object}   user     - user info
//        * @param  {Function} callback - optional
//        * @return {Promise}
//        */
//       service.createUser = function(user, callback) {
//         var cb = callback || angular.noop;
//
//         return Account.save(user,
//           function(data) {
//             console.log(data);
//             return cb(user);
//             // $cookieStore.put('token', data.token);
//             // currentUser = User.get();
//             // return cb(user);
//           },
//           function(err) {
//             service.logout();
//             return cb(err);
//           }.bind(this)).$promise
//           .then(function() {
//             return service.login(user);
//           });
//       };
//
//       /**
//        * Change password
//        *
//        * @param  {String}   oldPassword
//        * @param  {String}   newPassword
//        * @param  {Function} callback    - optional
//        * @return {Promise}
//        */
//       service.changePassword = function(oldPassword, newPassword, callback) {
//         var cb = callback || angular.noop;
//
//         return Account.changePassword({
//           oldPassword: oldPassword,
//           newPassword: newPassword
//         }, function(user) {
//           return cb(user);
//         }, function(err) {
//           return cb(err);
//         }).$promise;
//       };
//
//       /**
//        * Gets all available info on authenticated user
//        *
//        * @return {Object} user
//        */
//       service.getCurrentUser = function() {
//         return currentUser;
//       };
//
//       /**
//        * Check if a user is logged in
//        *
//        * @return {Boolean}
//        */
//       service.isLoggedIn = function() {
//         var token = $cookieStore.get('token');
//         return !angular.isUndefined(token) && token !== null;
// //        return currentUser.hasOwnProperty('authorities');
//       };
//
//       /**
//        * Waits for currentUser to resolve before checking if user is logged in
//        */
//       service.isLoggedInAsync = function(cb) {
//         // if(currentUser.hasOwnProperty('$promise')) {
//         //   currentUser.$promise.then(function() {
//         //     cb(true);
//         //   }).catch(function() {
//         //     cb(false);
//         //   });
//         // } else if(currentUser.hasOwnProperty('authorities')) {
//         //   cb(true);
//         // } else {
//         //   cb(false);
//         // }
//         return cb();
//       };
//
//       /**
//        * Check if a user is an admin
//        *
//        * @return {Boolean}
//        */
//       service.isAdmin = function() {
//         var roles = currentUser.authorities;
//         if (roles) {
//           return roles.indexOf('ROLE_ADMIN' >= 0);
//         }
//         return false;
//       };
//
//       /**
//        * Get auth token
//        */
//       service.getToken = function() {
//         return $cookieStore.get('token');
//       };
//
//       return service;
//   });
