var fs = require('fs'),
  vm = require('vm'),
  babel = require('babel-core');

var babelOptions = {
  presets: ['es2015']
};

/**
 * load context
 * prepares a file for mocha by running it
 * pathToContext: an absolute path to the file
 * TODO: allow relative paths running from invoked __dirname
 */
module.exports = function loadContext(pathToContext, settings) {
  var context;
  var fileType = getExtension(pathToContext);

  switch (fileType) {
    case '.json':
    case '.js':
      if (settings && settings.babel) {
        // ES6 (ES2015)
        context = babel.transformFileSync(__dirname + '/tests/toCompile/test.es6.js', babelOptions).code;
      } else {
        // ES5
        context = fs.readFileSync(pathToContext);
      }
      break;

    case '.ts':
      var ts = require('typescript');
      var options = {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES5
      };
      var host = createCompilerHost(options, moduleSearchLocations);
      context = ts.createProgram([pathToContext], options, host);
      /// do something with program...
      break;

    case '.coffee': // no support yet
    case '.jsx': // no support yet

    default:
      var error = 'File type ' + fileType + ' not supported. Cannot load unit test from context.';
      throw (error);
  }
  // run test file with provided file context
  vm.runInThisContext(context);
  // for testing, return true if no errors
  if (context.length) {
    return true;
  }
};

function getExtension(string) {
  var extensionRegex = /\.[0-9a-z]+$/i;
  return extensionRegex.exec(string)[0];
}
