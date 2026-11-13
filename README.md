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

The existing branch filters in [`.drone.yml`](.drone.yml) apply unchanged. Pull
requests run E2E tests against the deployed branch URL. After either a passing or
failing test run, Drone publishes the HTML report as a ZIP on the
`pr-<number>-playwright-report` prerelease and creates or updates one marked bot
comment on the PR. Reruns replace the report asset rather than accumulating
assets or comments. Publishing fails explicitly if no HTML report was generated.

Report publishing uses a short-lived GitHub App installation token, not a PAT.
Configure Drone secrets `hof_ukho_gh_app_id`, `hof_ukho_gh_app_pk`, and
`hof_ukho_gh_app_install_id`. The App must be installed on this repository with
**Contents: read/write** (releases) and **Issues: read/write** (PR comments).
The existing `HOF_GH_APP_*` secrets remain responsible for cloning configuration.
The token file is removed after publishing, including on failure.

The existing `nightly_e2e_playwright` Drone cron runs against
`NIGHTLY_E2E_BASE_URL`. Configure its schedule in Drone; this change does not
create or change the schedule. The nightly Slack notification uses
`slack_sas_hof_e2e_tests_webhook` and includes outcome counts, duration, and run
errors from Playwright's JSON report. Setup or missing-report failures are
reported explicitly instead of appearing as zero passing/failing tests.

[`bin/publish_e2e_test_report.sh`](bin/publish_e2e_test_report.sh) requires Bash,
curl, jq, zip, `playwright-report/index.html`, and the environment variables
`GITHUB_APP_TOKEN`, `DRONE_REPO`, `DRONE_PULL_REQUEST`, `DRONE_BUILD_NUMBER`,
`DRONE_BUILD_LINK`, and `DRONE_COMMIT_SHA`. Local execution publishes real GitHub
assets and comments; never put tokens in the script or commit them.