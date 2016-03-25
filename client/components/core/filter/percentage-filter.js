(() => {
  'use strict';

  function filter($filter) {
    return function (input, decimals) {
      return $filter('number')(input * 100, decimals) + ' %';
    };
  }

  angular
    .module('petz.core')
    .filter('percentage', ['$filter', filter]);

})();
