'use strict';

module.exports = SuperClass => class extends SuperClass {
  getValues(req, res, next) {
    if (req.query.type) {
      req.sessionModel.set('form-type', req.query.type);
    }
    return super.getValues(req, res, next);
  }
};
