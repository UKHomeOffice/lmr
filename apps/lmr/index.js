'use strict';

const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'lmr',
  steps: {
    '/tenancy-start': {
      fields: ['move-date'],
      next: '/tenant-details',
      continueOnEdit: true
    },
    '/tenant-details': {
      fields: ['tenant-full-name', 'tenant-dob', 'tenant-nationality'],
      next: '/summary',
      backLink: 'tenancy-start'
    },
    '/summary': {
      behaviours: [SummaryPageBehaviour],
      template: 'confirm',
      sections: require('./sections/summary-data-sections')
    }
  }
};
