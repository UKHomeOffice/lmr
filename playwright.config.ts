import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'e2e-tests/features/**/*.feature',
  steps: [
    'e2e-tests/steps/**/*.step.ts',
    'e2e-tests/fixture/fixtures.ts'
  ]
});

export default defineConfig({
  testDir,
  timeout: 30000, //This is 30 seconds
  expect: {
    timeout: 6000, //This is 6 seconds
  },

  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://lmr.uat.sas-notprod.homeoffice.gov.uk/',
    headless: !!process.env.CI,
    viewport: null,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: {
        browserName: 'chromium',
        // Note: If we want to use the native browser ('chromium'), simply replace 'chrome' with 'chromium'.
        channel: 'chrome',
        launchOptions: {
          args: ['--start-maximized'],
        },
        video: 'on', //Options => 'on', 'off', 'retain-on-failure' or 'on-first-retry'
        screenshot: 'only-on-failure',
      },
    },
  ],
});