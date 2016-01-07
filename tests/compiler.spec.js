var expect = require('chai').expect;
var loadContext = require('../context.js');

function isTrue() {
  return true;
}

describe('compiler', function() {

  it('compiles js files without throwing', function() {
    var loaded = loadContext(__dirname + '/toCompile/test.js');
    expect(loaded).to.be.true;
  });

  it('compiles es6 files without throwing', function() {
    var loaded = loadContext(__dirname + '/toCompile/test.es6.js');
    expect(loaded).to.be.true;
  });

  it('compiles ts files without throwing', function() {
    var loaded = loadContext(__dirname + '/toCompile/test.ts');
    expect(loaded).to.be.true;
  });

  it('compiles coffee files without throwing', function() {
    var loaded = loadContext(__dirname + '/toCompile/test.coffee');
    expect(loaded).to.be.true;
  });

});
