/* eslint-disable */
'use strict';

const hof = require('hof');
const Submit = require('./behaviours/submit');
const SummaryPageBehaviour = require('hof').components.summary;
const PostcodeLookup = hof.components.postcodeLookup;

module.exports = {
  name: 'lmr',
  baseUrl: '/',
  confirmStep: '/summary',
  steps: {
    '/start': {
      next: 'tenancy-start'
    },
    '/tenancy-start': {
      fields: ['move-date'],
      next: '/tenant-details',
      backLink: 'start'
    },
    '/tenant-details': {
      fields: ['tenant-full-name', 'tenant-dob', 'tenant-nationality'],
      next: '/postcode',
      backLink: 'tenancy-start'
    },
    '/postcode': {
      behaviours: [PostcodeLookup({
        addressFieldNamePrefix: 'address-one',
        apiURL: process.env.POSTCODE_API_URL,
        apiKey: process.env.POSTCODE_API_KEY,
        required: true
      })],
      next: '/property-address'
    },
    '/property-address': {
      fields: ['address-line-1', 'address-line-2', 'town-or-city', 'county', 'postcode'],
      next: '/landlord-details',
      backLink: 'tenant-details',
    },
    '/landlord-details': {
      fields: ['landlord-full-name', 'company-name', 'landlord-email', 'landlord-phone'],
      next: '/summary',
      backLink: 'property-address',
    },
    '/summary': {
      behaviours: [SummaryPageBehaviour],
      template: 'confirm',
      sections: require('./sections/summary-data-sections'),
      next: '/privacy',
      backLink: 'landlord-details'
    },
    '/privacy': {
      behaviours: [SummaryPageBehaviour, Submit],
      fields: ['privacy-check'],
      sections: require('./sections/summary-data-sections'),
      next: '/privacy-declaration',
      backLink: 'summary'
    },
    '/privacy-declaration': {
      behaviours: ['complete'],
      backLink: false,
      clearSession: true
    },
    '/accessibility': {
      backLink: 'start'
    }
  }
};
