/* eslint-disable */
'use strict';

const hof = require('hof');
const Submit = require('./behaviours/submit');
const Summary = hof.components.summary;

module.exports = {
  name: 'lmr',
  steps: {
    '/privacy': {
      behaviours: [Summary, Submit],
      fields: ['privacy-check'],
      sections: require('./sections/summary-data-sections'),
      backLink: true,
      next: '/privacy-declaration'
    },
    '/privacy-declaration': {
      behaviours: ['complete'],
      backLink: false,
      clearSession: true
    }
  }
};
