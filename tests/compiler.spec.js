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
    var settings = {
      babel: true
    };
    var loaded = loadContext(__dirname + '/toCompile/test.es6.js', settings);
    expect(loaded).to.be.true;
  });

  it('compiles ts files without throwing', function() {
    var loaded = loadContext(__dirname + '/toCompile/test.ts');
    expect(loaded).to.be.true;
  });

});

describe('compiler options', function() {

  it('passes in babel compiler options', function() {
    var settings = {
      babel: true,
      babelOptions: {
        comments: false
      }
    };
    var loaded = loadContext(__dirname + '/toCompile/test.es6.js', settings);
    expect(loaded).to.be.true;
  });

  it('passes in typescript compiler options', function() {
    var settings = {
      tsOptions: {
        removeComments: true
      }
    };
    var loaded = loadContext(__dirname + '/toCompile/test.ts', settings);
    expect(loaded).to.be.true;
  });

});
