'use strict';

const dateComponent = require('hof').components.date;
const countries = require('hof').utils.countries();

module.exports = {
  'move-date': dateComponent('move-date', {
    isPageHeading: false,
    validate: ['required', 'notUrl', 'date', 'before', { type: 'after', arguments: '2014-11-30' }]
  }),
  'tenant-full-name': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [1000] }],
    className: ['govuk-input']
  },
  'tenant-dob': dateComponent('tenant-dob', {
    isPageHeading: false,
    validate: ['required', 'notUrl', 'date', 'over18']
  }),
  'tenant-nationality': {
    mixin: 'select',
    className: ['typeahead'],
    validate: ['required', 'notUrl'],
    options: [{
      value: '',
      label: 'fields.tenant-nationality.options.null'
    }].concat(countries)
  },
  'address-line-1': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }]
  },
  'address-line-2': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }]
  },
  'town-or-city': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }]
  },
  county: {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }]
  },
  postcode: {
    mixin: 'input-text',
    // Regex validation to only allow postcodes within England.
    // Includes Wales/England and Scotland/England postcode areas which are cross-bordered
    // eslint-disable-next-line
    validate: ['required', 'notUrl', { type: 'regex', arguments:/^(AL|B|B[ABDHLNRS]|C[ABHMORTVW]|D[AEGHLNTY]|E|E[CNX]|FY|G[LU]|H[ADGPUX]|I[G​P]‌​|KT|L|L[ADENSU]|M|ME|MK|N|N[EGNRW]|O[LX]|P[ELOR]|R[GHM]|S|S[EGKLMNOPRSTW]|T[AFNQ‌​‌​RSW]|UB|W|W[ACDFNRSV]|YO)\d{1,2}\s?(\d[\w]{2})?$/}],
    formatter: ['ukPostcode'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'landlord-full-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [1000] }]
  },
  'company-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [200] }]
  },
  'landlord-email': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: [254] }]
  },
  'landlord-phone': {
    mixin: 'input-text',
    validate: ['internationalPhoneNumber', 'notUrl', {type: 'maxlength', arguments: [16]}]
  },
  'privacy-check': {
    mixin: 'checkbox',
    validate: ['required']
  }
};
