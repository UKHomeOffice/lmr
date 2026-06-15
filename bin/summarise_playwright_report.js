'use strict';

const fs = require('node:fs');

function readJson(path) {
  const raw = fs.readFileSync(path, 'utf8');
  return JSON.parse(raw);
}

function durationToSeconds(durationMs) {
  if (!Number.isFinite(durationMs)) {
    return 'unknown';
  }
  return (durationMs / 1000).toFixed(1);
}

function buildSummary(report) {
  const stats = report?.stats || {};

  const expected = Number.isFinite(stats.expected) ? stats.expected : 0;
  const unexpected = Number.isFinite(stats.unexpected) ? stats.unexpected : 0;
  const flaky = Number.isFinite(stats.flaky) ? stats.flaky : 0;
  const skipped = Number.isFinite(stats.skipped) ? stats.skipped : 0;
  const duration = durationToSeconds(stats.duration);
  const total = expected + unexpected + flaky + skipped;

  return [
    'Playwright Nightly Summary',
    `Total: ${total}`,
    `Passed: ${expected}`,
    `Failed: ${unexpected}`,
    `Flaky: ${flaky}`,
    `Skipped: ${skipped}`,
    `Duration (s): ${duration}`,
  ].join('\n');
}

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  if (!inputPath || !outputPath) {
    console.error('Usage: node bin/summarise_playwright_report.js <input-json> <output-txt>');
    process.exit(1);
  }

  let summary;
  try {
    const report = readJson(inputPath);
    summary = buildSummary(report);
  } catch (error) {
    summary = `Playwright Nightly Summary\nUnable to parse report: ${error.message || error}`;
  }

  fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
  console.log(summary);
}

main();
