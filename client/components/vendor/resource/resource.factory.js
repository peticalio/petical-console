'use strict';

angular.module('petz.vendor')
  .factory('resource', ['$resource', '$cacheFactory', '$rootScope', 'api', function ($resource, $cacheFactory, $rootScope, api) {
    var cacheClearInterceptor = {
      response: function (response) {
        $cacheFactory.get('$http').remove(response.config.url);
        return response;
      }
    };
    var queryInterceptor = {
      response: function (response) {
        $cacheFactory.get('$http').remove(response.config.url);
        return response.data;
      }
    };

    return function (url, paramDefaults, actions, options) {
      actions = angular.extend({}, actions, {
        'load':    { method: 'GET', cache: true },
        'get':     { method: 'GET', cache: false, interceptor: queryInterceptor },
        'query':   { method: 'GET', cache: true, isArray: true },
        'fetch':   { method: 'GET', cache: false, isArray: true },
        'clear':   { method: 'GET', cache: true, isArray: true, interceptor: cacheClearInterceptor },
        'save':    { method: 'POST', interceptor: cacheClearInterceptor },
        'remove':  { method: 'DELETE', interceptor: cacheClearInterceptor },
        'delete':  { method: 'DELETE', interceptor: cacheClearInterceptor },
        'update':  { method: 'PUT', interceptor: cacheClearInterceptor },
        'patch':   { method: 'PATCH', interceptor: cacheClearInterceptor },
      });

      var resource = $resource(api.domain + url, paramDefaults, actions, options);

      // resource.prototype.clear = function(url) {
      //   $cacheFactory.get('$http').remove(api.domain + url);
      // };

      return resource;
    };
  }]);
