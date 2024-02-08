'use strict';

module.exports = {
  'address-line-1': {
    mixin: 'input-text',
    validate: ['required', 'notUrl']
  },
  'address-line-2': {
    mixin: 'input-text',
    validate: 'notUrl'
  },
  'town-or-city': {
    mixin: 'input-text',
    validate: ['required', 'notUrl']
  },
  county: {
    mixin: 'input-text',
    validate: 'notUrl'
  },
  postcode: {
    mixin: 'input-text',
    // Regex validation to only allow postcodes within England.
    // Includes Wales/England and Scotland/England postcode areas which are cross-bordered
    // eslint-disable-next-line
    validate: ['required', 'notUrl', { type: 'regex', arguments:/^(AL|B|B[ABDHLNRS]|C[ABHMORTVW]|D[AEGHLNTY]|E|E[CNX]|FY|G[LU]|H[ADGPUX]|I[G​P]‌​|KT|L|L[ADENSU]|M|ME|MK|N|N[EGNRW]|O[LX]|P[ELOR]|R[GHM]|S|S[EGKLMNOPRSTW]|T[AFNQ‌​‌​RSW]|UB|W|W[ACDFNRSV]|YO)\d{1,2}\s?(\d[\w]{2})?$/}],
    formatter: ['ukPostcode'],
    className: ['govuk-input', 'govuk-input--width-10']
  }
};
