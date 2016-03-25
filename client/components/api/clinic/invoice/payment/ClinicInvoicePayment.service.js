'use strict';

angular.module('petz.api')
  .factory('ClinicInvoicePayment', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/invoices/:invoiceId/payments', {});
    }
  ]);
