'use strict';

/* eslint no-process-env: 0 */
module.exports = {
  dateTimeFormat: 'DD MMM YYYY HH:mm:ss',
  email: {
    caseworker: process.env.CASEWORKER_EMAIL || '',
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    transportType: 'ses',
    region: process.env.EMAIL_REGION || ''
  },
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_STUB === 'true' ? 'USE_MOCK' : process.env.NOTIFY_KEY,
    userAuthTemplateId: process.env.USER_AUTHORISATION_TEMPLATE_ID,
    caseworkerEmail: process.env.CASEWORKER_EMAIL,
    submissionTemplateId: process.env.SUBMISSION_TEMPLATE_ID,
    caseworkerSubmissionTemplateId: process.env.CASEWORKER_SUBMISSION_TEMPLATE_ID
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  }
};
