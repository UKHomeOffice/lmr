'use strict';

(async () => {
  global.chai = await import('chai');

  global.should = chai.should();
  global.expect = chai.expect;
})();
