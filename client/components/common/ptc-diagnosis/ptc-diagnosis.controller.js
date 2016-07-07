(() => {
  'use strict';

  class PtcDiagnosisController {
    constructor() {
    }

    init(array) {
      // 区分マップ
      var types = [];
      var map = {};
      array.forEach((element) => {
        types.push(element.type);
        if (!map[element.type]) {
          map[element.type] = [];
        }
        map[element.type].push({id:element.id, name:element.name});
      });

      this.types = [];
      Array.from(new Set(types)).forEach((element) => {
        this.types.push({type:element, values:map[element]});
      });

      // 区分
      // var types = [];
      // array.forEach(function(element) {
      //   types.push(element.type);
      // });
      // this.types = Array.from(new Set(types));
      //
      // // 区分マップ
      // var map = {};
      // array.forEach(function(element) {
      //   if (!map[element.type]) {
      //     map[element.type] = [];
      //   }
      //   map[element.type].push({id:element.id, name:element.name});
      // });
      // this.map = map;
    }

    select(diagnosis) {
      this.model = angular.copy(diagnosis);
    }
  }

  angular.module('petzApp.util')
    .component('ptcDiagnosis', {
      templateUrl: 'components/common/ptc-diagnosis/ptc-diagnosis.html',
      controller:  PtcDiagnosisController,
      bindings: {
        form:        '=',
        name:        '@',
        model:       '=', // ng-model
        data:        '<', // data
        required:    '@'  // ng-required
      }
    });
})();
