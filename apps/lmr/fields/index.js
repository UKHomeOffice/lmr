'use strict';

const dateComponent = require('hof').components.date;
const countries = require('hof').utils.countries();
const validators = require('hof/controller/validation/validators');

/**
 * Validation rule to validate the postcode for 'England'.
 * @param {string} value - The value to be checked.
 * @constant isValidPostcode - The value to check the input is valid postcode or not using HOF 'postcode' validator.
 * @returns {boolean} - Returns true if the value is valid England postcode, otherwise false.
 */
function englandPostcodeValidator(value) {
  const isValidPostcode = validators.postcode(value);
  // Regex validation to only allow postcodes within England.
  // Includes Wales/England and Scotland/England postcode areas which are cross-bordered (DG, HR, LD, LL, NP, SY)
  // eslint-disable-next-line
  return isValidPostcode && validators.regex(value, /^(A[L]|B[ABDHLNRS]?|C[ABHMORTVW]|D[AEGHLNTY]|E[CNX]?|F[Y]|G[LU]|H[ADGPRUX]|I[GP]|K[T]|L[ADELNSU]?|M[EK]?|N[EGNPRW]?|O[LX]|P[ELOR]|R[GHM]|S[EGKLMNOPRSTWY]?|T[AFNQRSW]|UB|W[ACDFNRSV]?|YO)([A-Za-z\d]{1,2})\s?([A-Za-z\d]{3})$/);
}

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
    validate: ['required', 'notUrl', englandPostcodeValidator],
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
