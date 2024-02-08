'use strict';

module.exports = {
  'tenants-information': {
    steps: [
      {
        step: '/property-address',
        field: 'address-line-1'
      },
      {
        step: '/property-address',
        field: 'address-line-2',
        parse: (list, req) => {
          if (req.sessionModel.get('address-line-2') ===  '') {
            return ' ';
          }
          return list;
        }
      },
      {
        step: '/property-address',
        field: 'town-or-city'
      },
      {
        step: '/property-address',
        field: 'county',
        parse: (list, req) => {
          if (req.sessionModel.get('county') ===  '') {
            return ' ';
          }
          return list;
        }
      },
      {
        step: '/property-address',
        field: 'postcode'
      }
    ]
  }
};
