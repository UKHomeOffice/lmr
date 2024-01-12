'use strict';

const dateComponent = require('hof').components.date;
const countries = require('hof').utils.countries();

module.exports = {
  'move-date': dateComponent('move-date', {
    isPageHeading: false,
    validate: ['required', 'notUrl', 'date', 'before', { type: 'after', arguments: '2014-11-30' }]
  }),
  'tenant-full-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl']
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
  }
};
