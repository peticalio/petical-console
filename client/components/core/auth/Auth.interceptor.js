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
        if (response.status === 401) {
          $location.path('/signin');
          $cookieStore.remove('token');
        } else if (response.status === 400) {
          // var ExceptionHandler = $injector.get('ExceptionHandler');
          // ExceptionHandler.handle(response);
          $log.info(response);
        } else if (response.status === 500) {
          // var Notify = $injector.get('Notify');
          // Notify.error('ただいまサーバが利用不能です。暫くしてからもう一度お試しください。');
          $log.error(response);
        }
        return $q.reject(response);
      }
    };
  }])
