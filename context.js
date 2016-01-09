var fs = require('fs'),
  vm = require('vm'),
  callsite = require('callsite'),
  path = require('path'),
  babel = require('babel-core'),
  babelOptions = {
    presets: ['es2015']
  },
  ts = require('typescript'),
  tsOptions = {
    module: 'commonjs',
    target: 'ES5'
  };

function getExtension(string) {
  var extensionRegex = /\.[0-9a-z]+$/i;
  return extensionRegex.exec(string)[0];
}

// get invoked directory path
function getInvokedDirname() {
  requester = callsite()[2].getFileName();
  return path.dirname(requester);
}

/**
 * load context
 * prepares a file for mocha by running it
 * pathToContext: an absolute path to the file
 * TODO: allow relative paths running from invoked __dirname context
 */
module.exports = function loadContext(pathToContext, settings) {

  var dirname = getInvokedDirname(),
    absolutePath = path.join(dirname, pathToContext),
    fileContents = fs.readFileSync(absolutePath, 'utf8');

  var context;
  var fileType = getExtension(pathToContext);

  switch (fileType) {
    case 'json':
    case '.js':
      if (settings && settings.babel) {
        // ES6 (ES2015) (using Babel)
        var options = babelOptions;
        if (settings.babelOptions) {
          options = Object.assign(options, settings.babelOptions);
        }
        context = babel.transform(fileContents, options).code;
      } else {
        // ES5
        context = fileContents;
      }
      break;

    case '.ts':
      var options = tsOptions;
      if (settings && settings.tsOptions) {
        options = Object.assign(options, settings.tsOptions);
      }
      context = ts.transpile(fileContents, options);
      break;

    default:
      var error = 'File type ' + fileType + ' not supported. Cannot load unit test from context.';
      throw (error);
  }
  // run test file with provided file context
  vm.runInThisContext(context);
  // return true if no errors
  if (context.length) {
    return true;
  }
};
