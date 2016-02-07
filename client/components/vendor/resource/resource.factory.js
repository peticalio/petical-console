'use strict';

angular.module('petz.vendor')
  .factory('resource', ['$resource', '$cacheFactory', 'Server', function ($resource, $cacheFactory, Server) {
    var interceptor = {
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
        'fetch':   { method: 'GET', cache: false, isArray: true, interceptor: interceptor },
        'save':    { method: 'POST', interceptor: interceptor },
        'remove':  { method: 'DELETE', interceptor: interceptor },
        'delete':  { method: 'DELETE', interceptor: interceptor },
        'update':  { method: 'PUT', interceptor: interceptor },
        'patch':   { method: 'PATCH', interceptor: interceptor },
      });

      var resource = $resource(Server.baseUrl + url, paramDefaults, actions, options);

      resource.prototype.clear = function(url) {
        $cacheFactory.get('$http').remove(Server.baseUrl + url);
      };

      return resource;
    };
  }]);
