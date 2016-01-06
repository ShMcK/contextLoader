var ts = require('typescript');

module.exports = function(source) {
  return ts.transpile((source), {
    module: ts.ModuleKind.CommonJS
  });
};
