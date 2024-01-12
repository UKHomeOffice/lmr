/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'lmr',
  steps: {
    '/landlord-details': {
      fields: ['landlord-full-name', 'company-name', 'landlord-email', 'landlord-phone'],
      backLink: true,
      next: '/summary'
    },
    '/summary': {
      behaviours: [SummaryPageBehaviour],
      template: 'confirm',
      sections: require('./sections/summary-data-sections')
    }
  }
};
