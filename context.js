var fs = require('fs');
var vm = require('vm');

/**
 * load context
 * runs a test within the context of another file
 */
module.exports = function loadContext(pathToContext: string): void {
  var context = fs.readFileSync(pathToContext);
  vm.runInThisContext(context);
}
