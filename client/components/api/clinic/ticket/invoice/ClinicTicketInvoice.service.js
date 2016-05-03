'use strict';

angular.module('petz.api')
  .factory('ClinicTicketInvoice', ['resource',
    function (resource) {
      return resource('/api/v1/clinics/:clinicId/tickets/:ticketId/invoices/:invoiceId');
    }
  ]);
