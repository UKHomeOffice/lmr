/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'lmr',
  steps: {
    '/property-address': {
      fields: ['address-line-1', 'address-line-2', 'town-or-city', 'county', 'postcode'],
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
