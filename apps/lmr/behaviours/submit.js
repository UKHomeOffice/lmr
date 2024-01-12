'use strict';

const CreateAndSendPDF = require('./create-and-send-pdf');

module.exports = superclass => class extends superclass {
  async successHandler(req, res, next) {
    const uploadPdfShared = new CreateAndSendPDF({
      sendReceipt: true,
      sortSections: true
    });
    try {
      await uploadPdfShared.send(req, res, super.locals(req, res));
    } catch (error) {
      return next(error);
    }

    return super.successHandler(req, res, next);
  }
};
