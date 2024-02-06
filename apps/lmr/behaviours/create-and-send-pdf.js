
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const config = require('../../../config');
const utilities = require('../../../lib/utilities');
const _ = require('lodash');
const NotifyClient = utilities.NotifyClient;
const PDFModel = require('hof').apis.pdfConverter;
const { uuid } = require('uuidv4');

const submissionTemplateId = config.govukNotify.submissionTemplateId;
const caseworkerEmail = config.govukNotify.caseworkerEmail;
const notifyKey = config.govukNotify.notifyApiKey;
const dateTimeFormat = config.dateTimeFormat;

const notifyClient = new NotifyClient(notifyKey);

module.exports = class CreateAndSendPDF {
  constructor(behaviourConfig) {
    this.behaviourConfig = behaviourConfig;
  }

  readCss() {
    return new Promise((resolve, reject) => {
      const cssFile = path.resolve(__dirname, '../../../public/css/app.css');
      fs.readFile(cssFile, (err, data) => err ? reject(err) : resolve(data));
    });
  }

  readHOLogo() {
    return new Promise((resolve, reject) => {
      const hoLogoFile = path.resolve(__dirname, '../../../assets/images/ho-logo.png');
      fs.readFile(hoLogoFile, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(`data:image/png;base64,${data.toString('base64')}`);
      });
    });
  }

  async renderHTML(req, res, locs) {
    let locals = locs;

    if (this.behaviourConfig.sortSections) {
      locals = this.sortSections(locs);
    }

    locals.title = 'Landlords make a report';
    locals.dateTime = moment().format(dateTimeFormat);
    locals.values = req.sessionModel.toJSON();
    locals.htmlLang = res.locals.htmlLang || 'en';

    // Generate reference number using UUID and set it in the session to be accessed on the declaration page
    const refNumber = uuid();
    req.sessionModel.set('reference-number', refNumber);
    locals.referenceNumber = refNumber;

    locals.css = await this.readCss(req);
    locals['ho-logo'] = await this.readHOLogo();
    return new Promise((resolve, reject) => {
      res.render('pdf.html', locals, (err, html) => err ? reject(err) : resolve(html));
    });
  }

  async sendEmailWithAttachment(req, pdfData) {
    const personalisations = this.behaviourConfig.notifyPersonalisations;

    try {
      if (notifyKey === 'USE_MOCK') {
        req.log('warn', '*** Notify API Key set to USE_MOCK. Ensure disabled in production! ***');
      }

      await notifyClient.sendEmail(submissionTemplateId, caseworkerEmail, {
        personalisation: Object.assign({}, personalisations, {
          link_to_file: notifyClient.prepareUpload(pdfData, { confirmEmailBeforeDownload: false }),
          full_name: req.sessionModel.get('tenant-full-name'),
          ref_number: req.sessionModel.get('reference-number'),
          has_company_name: req.sessionModel.get('company-name').length > 0 ? 'yes' : 'no',
          company_name: req.sessionModel.get('company-name'),
          tenancy_start_date: req.sessionModel.get('move-date'),
          date_of_birth: req.sessionModel.get('tenant-dob'),
          nationality: req.sessionModel.get('tenant-nationality'),
          address_1: req.sessionModel.get('address-line-1'),
          has_address_2: req.sessionModel.get('address-line-2').length > 0 ? 'yes' : 'no',
          address_2: req.sessionModel.get('address-line-2'),
          has_county: req.sessionModel.get('county').length > 0 ? 'yes' : 'no',
          county: req.sessionModel.get('county'),
          town: req.sessionModel.get('town-or-city'),
          postcode: req.sessionModel.get('postcode'),
          landlord_name: req.sessionModel.get('landlord-full-name'),
          email: req.sessionModel.get('landlord-email'),
          has_phone: req.sessionModel.get('landlord-phone').length > 0 ? 'yes' : 'no',
          phone: req.sessionModel.get('landlord-phone')
        })
      });

      const trackedPageStartTime = Number(req.sessionModel.get('session.started.timestamp'));
      const timeSpentOnForm = utilities.secondsBetween(trackedPageStartTime, new Date());

      req.log('info', 'lmr.submit_form.create_email_with_file_notify.successful');
      req.log('info', `lmr.submission.duration=[${timeSpentOnForm}] seconds`);
    } catch (err) {
      const error = _.get(err, 'response.data.errors[0]', err.message || err);
      req.log('error', 'lmr.submit_form.create_email_with_file_notify.error', error);
      throw new Error(error);
    }
  }

  async send(req, res, locals) {
    try {
      const html = await this.renderHTML(req, res, locals);

      const pdfModel = new PDFModel();
      pdfModel.set({ template: html });
      const pdfData = await pdfModel.save();

      await this.sendEmailWithAttachment(req, pdfData);

      req.log('info', 'lmr.form.submit_form.successful');
    } catch(e) {
      req.log('error', JSON.stringify(e));
      throw e;
    }
  }

  sortSections(locals) {
    const translations = require('../translations/src/en/pages.json');
    const sectionHeaders = Object.values(translations.confirm.sections);
    const orderedSections = _.map(sectionHeaders, obj => obj.header);
    let rows = locals.rows;

    rows = rows.slice().sort((a, b) => orderedSections.indexOf(a.section) - orderedSections.indexOf(b.section));

    locals.rows = rows;
    return locals;
  }
};
