'use strict';

(async () => {
  const chai = await import('chai');

  global.chai = chai;
  global.should = chai.should();
  global.expect = chai.expect;
})();
