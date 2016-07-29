(()=> {
  'use strict';

  class ClinicFormController {
    constructor($state, toaster, api, vcRecaptchaService, Clinic, clinic) {
      this.state = $state;
      this.toaster = toaster;
      this.api = api;
      this.vcRecaptchaService = vcRecaptchaService;
      this.Clinic = Clinic;
      this.clinic = clinic;
    }

    // 動物病院を新規登録する
    save(clinic) {
      this.Clinic.save({captcha:this.response}, clinic).$promise
        .then((response) => {
          this.toaster.success('動物病院を新しく登録しました。');
          this.state.go('app.dashboard', {clinicId: response.data.id});
        });
    }

    // 動物病院を更新する
    update(clinic) {
      this.Clinic.update(clinic).$promise
        .then((response) => {
          this.toaster.success('動物病院の情報を更新しました。');
          this.state.go('app.dashboard', {clinicId: response.data.id});
        });
    }

    success(response) {
      this.response = response;
    }

    setWidgetId(id) {
      this.widgetId = id;
    }

    expired() {
      this.vcRecaptchaService.reload(this.widgetId);
    }
  }

  ClinicFormController.$inject = ['$state', 'toaster', 'api', 'vcRecaptchaService', 'Clinic', 'clinic'];
  angular.module('petzApp')
    .controller('ClinicFormController', ClinicFormController);

})();
