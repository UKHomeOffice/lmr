'use strict';

const CreateAndSendPDF = require('./create-and-send-pdf');

module.exports = superclass => class extends superclass {
  successHandler(req, res, next) {
    const uploadPdfShared = new CreateAndSendPDF({
      sendReceipt: true,
      sortSections: true
    });
    // don't await async process, allow user to move on
    uploadPdfShared.send(req, res, super.locals(req, res));

    return super.successHandler(req, res, next);
  }
};
