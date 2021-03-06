'use strict';

angular.module('petz.core')
  .factory('AuthInterceptor', ['$rootScope', '$q', '$cookieStore', '$location', '$log', '$injector', function ($rootScope, $q, $cookieStore, $location, $log, $injector) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        var token = $cookieStore.get('token');
        if (token && token.expires_at && token.expires_at > new Date().getTime()) {
          if (!config.headers.Authorization) {
            config.headers.Authorization = 'Bearer ' + token.access_token;
          }
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        var toaster = $injector.get('toaster');
        if (response.status === 400) {
          if (!(response.config.params && response.config.params.not)) {
            toaster.handle(response);
          }
          $log.info(response);
        } else if (response.status === 404) {
          toaster.error('該当する情報が存在しません。');
          $log.error(response);
        } else if (response.status === 500) {
          toaster.handle(response);
          $log.error(response);
        } else {
          toaster.error('タイムアウトしました。もう一度ログインしてください。');
          $cookieStore.remove('token');
          $injector.get('$state').go('app.signin');
        }
        return $q.reject(response);
      }
    };
  }]
);
