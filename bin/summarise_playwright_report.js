'use strict';

const fs = require('node:fs');

function buildSummary(report) {
  const stats = report.stats;
  const counts = ['expected', 'unexpected', 'flaky', 'skipped'];
  if (!stats || counts.some(key => !Number.isInteger(stats[key]) || stats[key] < 0) ||
      !Number.isFinite(stats.duration) || stats.duration < 0) {
    throw new Error('Missing or invalid Playwright report statistics');
  }

  const total = counts.reduce((sum, key) => sum + stats[key], 0);
  const passedPercentage = total ? (stats.expected / total * 100).toFixed(1) : '0.0';
  const failedPercentage = total ? (stats.unexpected / total * 100).toFixed(1) : '0.0';

  return [
    'Test Results:',
    `Passed: ${passedPercentage}% No Of Tests: ${stats.expected}`,
    `Failed: ${failedPercentage}% No Of Tests: ${stats.unexpected}`,
    `Total Results Reported: ${total} of ${total}`,
    `Flaky: ${stats.flaky}`,
    `Skipped: ${stats.skipped}`,
    `Duration: ${(stats.duration / 1000).toFixed(1)}s`,
    `Run errors: ${(report.errors || []).length}`,
  ].join('\n');
}

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputPath || !outputPath) {
    console.error('Usage: node bin/summarise_playwright_report.js <report-json> <output-txt>');
    process.exit(1);
  }

  let summary;
  try {
    summary = buildSummary(JSON.parse(fs.readFileSync(inputPath, 'utf8')));
  } catch (error) {
    summary = `Playwright Nightly Summary\nUnable to parse report: ${error.message}`;
    console.error(summary);
    process.exitCode = 1;
  }

  fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
  console.log(summary);
}

main();
