'use strict';

module.exports = {
  'landlord-full-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl']
  },
  'company-name': {
    mixin: 'input-text',
    validate: 'notUrl'
  },
  'landlord-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'landlord-phone': {
    mixin: 'input-text',
    validate: ['notUrl', 'internationalPhoneNumber', {type: 'maxlength', arguments: [200]}]
  }
};
