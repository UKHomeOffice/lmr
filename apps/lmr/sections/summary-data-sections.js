'use strict';

module.exports = {
  'landlord-details': {
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
