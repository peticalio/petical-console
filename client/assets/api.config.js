(()=> {
  'use strict';

  angular.module('petz.env', [])
    .constant('api', {
      domain: 'http://localhost:8080'
    });

})();
