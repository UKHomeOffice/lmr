/* eslint-disable */
'use strict';

const Submit = require('./behaviours/submit');
const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'lmr',
  baseUrl: '/',
  steps: {
    '/start': {
    },
    '/tenancy-start': {
      fields: ['move-date'],
      next: '/tenant-details',
      continueOnEdit: true
    },
    '/tenant-details': {
      fields: ['tenant-full-name', 'tenant-dob', 'tenant-nationality'],
      next: '/property-address',
      backLink: '/tenancy-start'
    },
    '/property-address': {
      fields: ['address-line-1', 'address-line-2', 'town-or-city', 'county', 'postcode'],
      backLink: true,
      next: '/landlord-details'
    },
    '/landlord-details': {
      fields: ['landlord-full-name', 'company-name', 'landlord-email', 'landlord-phone'],
      backLink: true,
      next: '/summary'
    },
    '/summary': {
      behaviours: [SummaryPageBehaviour],
      template: 'confirm',
      sections: require('./sections/summary-data-sections'),
      next: '/privacy'
    },
    '/privacy': {
      behaviours: [SummaryPageBehaviour, Submit],
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
