# LMR
Landlords Make a Report (LMR) form built using the HOF (Home Office Forms) Framework.

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with version 18+
- [Html-pdf-converter](https://github.com/UKHomeOffice/html-pdf-converter) service running on a separate port to this service
- make sure you have access to KeyBase to get the .env file

### GovUK Notify
You'll need to have the relevant GovNotify API key to run the app. Notify is needed for the form submission element, in order to send an email. Save this value as `NOTIFY_KEY` in your `.env` file. 

### Environment Variables
- `NOTIFY_KEY`= The GovUK Notify key
- `CASEWORKER_EMAIL`= The address emails should go to on form submission
- `SUBMISSION_TEMPLATE_ID`= The GovUK Notify email template ID
- `PDF_CONVERTER_URL`= The URL that the html-pdf-converter service is running on

A full list of environment variables for extended local integrations can be accessed in the HOF team Keybase.

### Run the service
```bash
$ cd lmr
$ yarn install
$ yarn start:dev
```
Then visit: [http://localhost:8080/](http://localhost:8080/) to access the start page.
> **Note**: You will need the html-pdf-converter service running on a separate port to this service in order to test the email functionality
