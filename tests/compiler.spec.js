var expect = require('chai').expect;
var loadContext = require('../context.js');

function isTrue() {
  return true;
}

describe('compiler', function() {

  it('compiles es5 files without throwing', function() {
    var loaded = loadContext(__dirname + '/toCompile/test.js');
    expect(loaded).to.be.true;
  });

  it('compiles es6 files without throwing', function() {
    var settings = { babel: true };
    var loaded = loadContext(__dirname + '/toCompile/test.es6.js', settings);
    expect(loaded).to.be.true;
  });

  xit('compiles ts files without throwing', function() {
    var loaded = loadContext(__dirname + '/toCompile/test.ts');
    expect(loaded).to.be.true;
  });

  xit('compiles coffee files without throwing', function() {
    var loaded = loadContext(__dirname + '/toCompile/test.coffee');
    expect(loaded).to.be.true;
  });

});
