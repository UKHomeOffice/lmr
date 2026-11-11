'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

describe('Playwright nightly summary', () => {
  let directory;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'lmr-playwright-summary-'));
  });

  afterEach(() => {
    fs.rmSync(directory, { recursive: true, force: true });
  });

  function summarise(report) {
    const input = path.join(directory, 'report.json');
    const output = path.join(directory, 'summary.txt');
    if (report !== undefined) {
      fs.writeFileSync(input, JSON.stringify(report));
    }
    const result = spawnSync(process.execPath, [
      path.resolve(__dirname, '../../../bin/summarise_playwright_report.js'), input, output
    ], { encoding: 'utf8' });
    return { ...result, summary: fs.readFileSync(output, 'utf8') };
  }

  it('counts outcomes once, including flaky tests, using structured statistics', () => {
    const result = summarise({
      stats: { expected: 8, unexpected: 2, flaky: 1, skipped: 3, duration: 12345 },
      errors: [{ message: 'A global teardown failed' }]
    });

    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.summary, [
      'Playwright Nightly Summary',
      'Total: 14',
      'Passed: 8',
      'Failed: 2',
      'Flaky: 1',
      'Skipped: 3',
      'Duration: 12.3s',
      'Run errors: 1',
      ''
    ].join('\n'));
  });

  it('reports an execution error even when no tests ran', () => {
    const result = summarise({
      stats: { expected: 0, unexpected: 0, flaky: 0, skipped: 0, duration: 10 },
      errors: [{ message: 'No tests found' }]
    });

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.summary, /Total: 0/);
    assert.match(result.summary, /Run errors: 1/);
  });

  for (const [name, report] of [
    ['missing report', undefined],
    ['missing statistics', {}],
    ['invalid counts', { stats: { expected: -1, unexpected: 0, flaky: 0, skipped: 0, duration: 0 } }]
  ]) {
    it(`fails explicitly for ${name} and writes a diagnostic for Slack`, () => {
      const result = summarise(report);

      assert.equal(result.status, 1);
      assert.match(result.stderr, /Unable to parse report/);
      assert.match(result.summary, /Unable to parse report/);
      assert.doesNotMatch(result.summary, /Passed: 0/);
    });
  }
});
