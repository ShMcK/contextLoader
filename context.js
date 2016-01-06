var fs = require('fs');
var vm = require('vm');

/**
 * load context
 * prepares a file for mocha by running it
 * pathToContext: a relative path to the file
 */
module.exports = function loadContext(pathToContext) {
  var context;
  var fileType = getExtension(pathToContext);

  switch (fileType) {
    case '.json':
    case '.js':
      context = fs.readFileSync(pathToContext);
      break;

    case '.ts':
      var ts = require('./compilers/ts.js');
      context = ts(fs.readFileSync(pathToContext));
      break;

    case '.coffee': // no support yet
    case '.jsx': // no support yet

    default:
      var error = 'File type ' + fileType + ' not supported. Cannot load unit test from context.';
      console.log(error);
      throw (error);
  }
  // run test file with provided file context
  vm.runInThisContext(context);
};

function getExtension(string) {
  var extensionRegex = /\.[0-9a-z]+$/i;
  return extensionRegex.exec(string)[0];
}
