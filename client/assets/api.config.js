(()=> {
  'use strict';

  angular.module('petz.api', [])
    .constant('api', {
      domain: 'http://localhost:8080'
    });

})();
