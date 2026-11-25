### LMR
Landlords Make a Report (LMR) form built using the HOF (Home Office Forms) Framework.

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with version 18+
- [Html-pdf-converter](https://github.com/UKHomeOffice/html-pdf-converter) service running on a separate port to this service
- [Redis server](http://redis.io/download) running on the default port

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

### Workaround for running E2E tests locally
In order to run e2e test locally, set `PLAYWRIGHT_BASE_URL` in the `.env` file to a branch URL.

### Playwright in Drone

Playwright uses the Allure reporter instead of Playwright HTML reporting. Pull
requests run E2E tests against the deployed branch URL; after either a passing or
failing test run, Drone generates and publishes a single-file Allure report as a
GitHub release asset and creates or updates a marked PR comment. Nightly runs on
the existing `nightly_e2e_playwright` cron run against the configured
`NIGHTLY_E2E_BASE_URL`, generate a Playwright JSON summary and single-file Allure report,
publish the report, and send a Slack notification on both success and failure.
Configure the cron schedule in Drone; this change does not create or change it.

The Slack message reports Drone build status separately from Playwright test
status. Test status comes from the test-generation/Playwright exit code, not the
Drone build status. The summary contains only passed, failed, flaky, and skipped
counts and percentages; missing, inconsistent, or invalid results are reported
as invalid rather than as zero passing/failing tests. The report link downloads
the single-file HTML report, which must be opened in a browser. Slack receives a
single long text message so its native “Show more” behavior can apply.

Report publishing uses a short-lived GitHub App installation token, not a PAT.
Configure Drone secrets `hof_ukho_gh_app_id`, `hof_ukho_gh_app_pk`, and
`hof_ukho_gh_app_install_id`. The App must be installed on this repository with
**Contents: read/write** access for release assets and **Issues: read/write**
access for PR comments. The existing `HOF_GH_APP_*` secrets remain responsible
for cloning configuration. Configure `SAS_HOF_EMAIL` and
`slack_sas_hof_e2e_tests_webhook` for nightly runs. `NIGHTLY_E2E_BASE_URL` is
configured in the Drone pipeline environment and should point to a deployed,
reachable LMR environment. The token file is removed after publishing,
including on failure.

[`bin/publish_e2e_test_report.sh`](bin/publish_e2e_test_report.sh) requires Bash,
curl, jq, `allure-report/index.html`, and the environment variables
`GITHUB_APP_TOKEN`, `DRONE_REPO`, `DRONE_BUILD_NUMBER`, `DRONE_BUILD_LINK`, and
`DRONE_COMMIT_SHA`; PR publishing additionally requires `DRONE_PULL_REQUEST`.
Local execution publishes real GitHub assets and comments; never put tokens in
the script or commit them.