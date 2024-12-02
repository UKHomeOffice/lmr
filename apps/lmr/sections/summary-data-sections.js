'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'DD MMMM YYYY';

module.exports = {
  'tenants-information': {
    steps: [
      {
        step: '/tenancy-start',
        field: 'move-date',
        parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
      },
      {
        step: '/tenant-details',
        field: 'tenant-full-name'
      },
      {
        step: '/tenant-details',
        field: 'tenant-dob',
        parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
      },
      {
        step: '/tenant-details',
        field: 'tenant-nationality',
        parse: (list, req) => {
          if (req.sessionModel.get('tenant-nationality') ===  '') {
            return ' ';
          }
          return list;
        }
      },
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
  },
  'landlord-information': {
    steps: [
      {
        step: '/landlord-details',
        field: 'landlord-full-name'
      },
      {
        step: '/landlord-details',
        field: 'company-name',
        parse: (list, req) => {
          if (req.sessionModel.get('company-name') ===  '') {
            return ' ';
          }
          return list;
        }
      },
      {
        step: '/landlord-details',
        field: 'landlord-email'
      },
      {
        step: '/landlord-details',
        field: 'landlord-phone',
        parse: (list, req) => {
          if (req.sessionModel.get('landlord-phone') ===  '') {
            return ' ';
          }
          return list;
        }
      }
    ]
  }
};
