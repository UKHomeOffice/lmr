const sections = require('../../../apps/lmr/sections/summary-data-sections.js');
const pages = require('../../../apps/lmr/translations/src/en/pages.json');

describe('Apply Summary Data Sections', () => {
  describe.only('Sections and Pages', () => {
    it('should have sections and page translations that correlate', () => {
      const sectionsKeys = Object.keys(sections).sort();
      const pagesSectionsKeys = Object.keys(pages.confirm.sections).sort();
      sectionsKeys.should.deep.equal(pagesSectionsKeys);
    });
  });
});
