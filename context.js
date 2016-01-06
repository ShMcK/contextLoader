var fs = require('fs');
var vm = require('vm');

/**
 * load context
 * runs a test within the context of another file
 * pathToContext: a relative path to the file
 */
module.exports = function loadContext(pathToContext) {
  var fileType = getExtension(pathToContext);

  console.log('ext', fileType);

  switch (fileType) {
    case '.json':
    case '.js':
      var context = fs.readFileSync(pathToContext);
      vm.runInThisContext(context);
      return;

    default:
      var error = 'File type ' + fileType + ' not supported. Cannot load unit test from context.';
      console.log(error);
      throw (error);
  }
};

function getExtension(string) {
  var extensionRegex = /\.[0-9a-z]+$/i;
  return extensionRegex.exec(string)[0];
}
