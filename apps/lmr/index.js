/* eslint-disable */
'use strict';

const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'lmr',
  steps: {
    '/start': {
      next: '/summary'
    },
    '/summary': {
      behaviours: [SummaryPageBehaviour],
      sections: require('./sections/summary-data-sections')
    }
  }
};
