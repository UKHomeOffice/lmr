import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const port = Number(process.env.PLAYWRIGHT_PORT || 8080);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`;

const testDir = defineBddConfig({
  features: 'e2e-tests/features/**/*.feature',
  steps: [
    'e2e-tests/steps/**/*.step.ts',
    'e2e-tests/fixture/fixtures.ts'
  ],
  outputDir: '.features-gen'
});

export default defineConfig({
  testDir,
  timeout: 30000, //This is 30 seconds
  expect: {
    timeout: 6000, //This is 6 seconds
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }], ['list']],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    viewport: null,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: true,
  },
  
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
      command: 'yarn start:dev',
      port,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000
    },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        browserName: 'chromium',
        launchOptions: {
          args: ['--start-maximized'],
        },
        video: 'retain-on-failure', //Options => 'on', 'off', 'retain-on-failure' or 'on-first-retry'
        screenshot: 'only-on-failure',
      },
    },
  ],
});
