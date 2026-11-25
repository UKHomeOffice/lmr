'use strict';

const fs = require('node:fs');

const CATEGORIES = ['expected', 'unexpected', 'flaky', 'skipped'];
const LABELS = { expected: 'Passed', unexpected: 'Failed', flaky: 'Flaky', skipped: 'Skipped' };

function invalid(reason) {
  return [
    'Passed: N/A No Of Tests: N/A',
    'Failed: N/A No Of Tests: N/A',
    'Flaky: N/A No Of Tests: N/A',
    'Skipped: N/A No Of Tests: N/A',
    'Total Results Reported: unknown',
    `Results: INVALID (${reason})`
  ].join('\n');
}

function collectOutcomes(suites) {
  if (!Array.isArray(suites)) {
    throw new Error('test suites are missing or invalid');
  }

  const outcomes = [];
  for (const suite of suites) {
    if (!suite || typeof suite !== 'object' ||
        (suite.specs !== undefined && !Array.isArray(suite.specs))) {
      throw new Error('test suites are invalid');
    }

    for (const spec of suite.specs || []) {
      if (!spec || !Array.isArray(spec.tests)) {
        throw new Error('test entries are missing or invalid');
      }
      for (const test of spec.tests) {
        if (!test || !CATEGORIES.includes(test.status)) {
          throw new Error('test outcomes are missing or invalid');
        }
        outcomes.push(test.status);
      }
    }

    outcomes.push(...collectOutcomes(suite.suites === undefined ? [] : suite.suites));
  }
  return outcomes;
}

function buildSummary(report) {
  try {
    if (!report || typeof report !== 'object' || Array.isArray(report) ||
        !report.stats || typeof report.stats !== 'object' || !Array.isArray(report.errors)) {
      throw new Error('Playwright statistics or run errors are missing or invalid');
    }

    const outcomes = collectOutcomes(report.suites);
    if (!outcomes.length) {
      throw new Error('no test outcomes were reported');
    }

    const counts = {};
    for (const category of CATEGORIES) {
      const count = report.stats[category];
      if (!Number.isSafeInteger(count) || count < 0) {
        throw new Error(`stats.${category} must be a non-negative integer`);
      }
      counts[category] = count;
    }

    const reported = CATEGORIES.reduce((sum, category) => sum + counts[category], 0);
    if (!Number.isSafeInteger(reported)) {
      throw new Error('result count exceeds the supported integer range');
    }

    const matches = CATEGORIES.every(category =>
      counts[category] === outcomes.filter(status => status === category).length);
    const lines = [
      ...CATEGORIES.map(category => {
        const percentage = (counts[category] / outcomes.length * 100).toFixed(1);
        return `${LABELS[category]}: ${percentage}% No Of Tests: ${counts[category]}`;
      }),
      `Total Results Reported: ${reported} of ${outcomes.length}`
    ];

    if (!matches) {
      lines.push('Results: INVALID (Playwright statistics do not match test outcomes)');
    }
    if (report.errors.length) {
      lines.push(`Results: INVALID (${report.errors.length} Playwright run error(s); see build logs)`);
    }
    return lines.join('\n');
  } catch (error) {
    return invalid(error.message);
  }
}

function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) {
    process.stderr.write('Usage: node bin/summarise_playwright_report.js <playwright-json> <summary-txt>\n');
    process.exitCode = 1;
    return;
  }

  let summary;
  try {
    summary = buildSummary(JSON.parse(fs.readFileSync(input, 'utf8')));
  } catch (error) {
    summary = invalid(`unable to read Playwright results: ${error.message}`);
  }

  fs.writeFileSync(output, `${summary}\n`);
  process.stdout.write(`${summary}\n`);
  if (summary.includes('Results: INVALID')) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { buildSummary };
