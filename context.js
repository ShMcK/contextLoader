var fs = require('fs');
var vm = require('vm');

/**
 * load context
 * runs a test within the context of another file
 * pathToContext: a relative path to the file
 */
module.exports = function loadContext(pathToContext) {
  var context = fs.readFileSync(__dirname + pathToContext);
  vm.runInThisContext(context);
};
