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
failing test run, Drone generates a single-file Allure report and publishes it as
an HTML asset on the `pr-<number>-allure-report` prerelease, then creates or
updates one marked bot comment on the PR. Download the asset and open it in a
browser. Reruns replace the report asset rather than accumulating assets or
comments. Publishing fails explicitly if no Allure report was generated.

Report publishing uses a short-lived GitHub App installation token, not a PAT.
Configure Drone secrets `hof_ukho_gh_app_id`, `hof_ukho_gh_app_pk`, and
`hof_ukho_gh_app_install_id`. The App must be installed on this repository with
**Contents: read/write** (releases) and **Issues: read/write** (PR comments).
The existing `HOF_GH_APP_*` secrets remain responsible for cloning configuration.
The token file is removed after publishing, including on failure.

The existing `nightly_e2e_playwright` Drone cron runs against
the configured `NIGHTLY_E2E_BASE_URL` (the LMR UAT environment in `.drone.yml`).
Configure its schedule in Drone; this change does not create or change the
schedule. Each run writes the Playwright JSON report and a compact JSON outcome
summary, and generates a single-file Allure HTML report when Allure results are
available, including after failed tests. The saved Playwright exit code includes
the current Drone build number so stale status data cannot be treated as a pass.

The nightly Slack notification uses `slack_sas_hof_e2e_tests_webhook`. Its
preview contains only the report heading, “Nightly Playwright Tests,” and the
Playwright `Status: Passed|Failed`. The colored attachment contains the expanded
report, including the actual Drone build status separately from Playwright test
status, branch, environment URL, build link, and outcome counts and percentages.
It contains no individual test details and uses Slack's native “Show more” /
“Show less” behavior. Missing or invalid status/results are explicitly marked
invalid rather than reported as a successful zero-test run. A published Allure
link downloads the single-file HTML report, which must be opened in a browser;
if publication fails, Slack links to the Drone build instead. The nightly report
is published to the `nightly-allure-report` prerelease and replaces the previous
nightly asset.

[`bin/publish_e2e_test_report.sh`](bin/publish_e2e_test_report.sh) requires Bash,
curl, jq, `allure-report/index.html` (override with `REPORT_FILE`), and the
environment variables `GITHUB_APP_TOKEN`, `DRONE_REPO`, `DRONE_BUILD_NUMBER`,
`DRONE_BUILD_LINK`, and `DRONE_COMMIT_SHA`. When `DRONE_PULL_REQUEST` is set it
also comments on the PR; otherwise it publishes the nightly report. Set
`REPORT_URL_FILE` to write the report download URL to a file. Local execution
publishes real GitHub assets and comments; never put tokens in the script or
commit them.