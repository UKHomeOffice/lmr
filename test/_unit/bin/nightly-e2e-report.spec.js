'use strict';

const assert = require('node:assert/strict');
const { buildSummary } = require('../../../bin/summarise_playwright_report');

describe('Nightly Playwright summary', () => {
  it('reports outcome percentages and verifies the reported test counts', () => {
    const report = {
      stats: { expected: 2, unexpected: 1, flaky: 1, skipped: 0 },
      errors: [],
      suites: [{
        specs: [{
          tests: [
            { status: 'expected' },
            { status: 'expected' },
            { status: 'unexpected' },
            { status: 'flaky' }
          ]
        }],
        suites: []
      }]
    };

    assert.equal(buildSummary(report), [
      'Passed: 50.0% No Of Tests: 2',
      'Failed: 25.0% No Of Tests: 1',
      'Flaky: 25.0% No Of Tests: 1',
      'Skipped: 0.0% No Of Tests: 0',
      'Total Results Reported: 4 of 4'
    ].join('\n'));
  });

  it('marks inconsistent statistics and run errors as invalid', () => {
    const report = {
      stats: { expected: 1, unexpected: 0, flaky: 0, skipped: 0 },
      errors: [{ message: 'run error' }],
      suites: [{
        specs: [{ tests: [{ status: 'unexpected' }] }],
        suites: []
      }]
    };

    const summary = buildSummary(report);
    assert.match(summary, /Total Results Reported: 1 of 1/);
    assert.match(
      summary,
      /Results: INVALID \(Playwright statistics do not match test outcomes\)/
    );
    assert.match(summary, /Results: INVALID \(1 Playwright run error/);
    assert.doesNotMatch(summary, /Results: VALID/);
  });

  it('reports missing outcomes or malformed reports instead of zero results', () => {
    const noOutcomes = buildSummary({
      stats: { expected: 0, unexpected: 0, flaky: 0, skipped: 0 },
      errors: [],
      suites: []
    });
    const malformed = buildSummary(null);

    assert.match(noOutcomes, /Total Results Reported: unknown/);
    assert.match(noOutcomes, /Results: INVALID \(no test outcomes were reported\)/);
    assert.match(malformed, /Passed: N\/A No Of Tests: N\/A/);
    assert.match(malformed, /Results: INVALID/);
  });
});
