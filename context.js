var fs = require('fs');
var vm = require('vm');
/**
 * load context
 * prepares a file for mocha by running it
 * pathToContext: an absolute path to the file
 * TODO: allow relative paths running from invoked __dirname
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
      var ts = require('typescript');
      const options = {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES5
      };
      const host = createCompilerHost(options, moduleSearchLocations);
      context = ts.createProgram([pathToContext], options, host);
      /// do something with program...
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
  return true;
};

function getExtension(string) {
  var extensionRegex = /\.[0-9a-z]+$/i;
  return extensionRegex.exec(string)[0];
}
