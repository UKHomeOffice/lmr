'use strict';

const fs = require('node:fs');

function buildSummary(report, testStatus) {
  const stats = report.stats;
  const counts = ['expected', 'unexpected', 'flaky', 'skipped'];
  if (!stats || counts.some(key => !Number.isSafeInteger(stats[key]) || stats[key] < 0)) {
    throw new Error('Missing or invalid Playwright report statistics');
  }

  const total = counts.reduce((sum, key) => sum + stats[key], 0);
  if (!Number.isSafeInteger(total)) {
    throw new Error('Invalid Playwright report total');
  }
  const outcome = (label, count) =>
    `${label}: ${total ? (count / total * 100).toFixed(1) : '0.0'}% No Of Tests: ${count}`;

  return [
    'Test Results:',
    `Test Status: ${testStatus === 'success' && stats.unexpected > 0 ? 'failed' : testStatus}`,
    outcome('Passed', stats.expected),
    outcome('Failed', stats.unexpected),
    outcome('Flaky', stats.flaky),
    outcome('Skipped', stats.skipped),
    `Total Results Reported: ${total} of ${total}`,
  ].join('\n');
}

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];
  const exitCode = process.argv[4];

  if (!inputPath || !outputPath) {
    console.error('Usage: node bin/summarise_playwright_report.js <report-json> <output-txt> <playwright-exit-code>');
    process.exit(1);
  }

  const validExitCode = /^(0|[1-9]\d*)$/.test(exitCode || '') && Number(exitCode) <= 255;
  const testStatus = validExitCode ? (exitCode === '0' ? 'success' : 'failed') : 'unavailable';
  if (!validExitCode) {
    console.error('Missing or invalid Playwright exit code');
    process.exitCode = 1;
  }

  let summary;
  try {
    summary = buildSummary(JSON.parse(fs.readFileSync(inputPath, 'utf8')), testStatus);
  } catch (error) {
    console.error(`Unable to parse Playwright report: ${error.message}`);
    summary = `Test Results:\nTest Status: ${testStatus}\nResults unavailable; check the E2E build logs.`;
    process.exitCode = 1;
  }

  fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
  console.log(summary);
}

main();
