# Context Loader

Used for loading unit tests in a given file context.

This allows running tests that load another file as their context. The result is the same as if your unit tests were written at the bottom of that file. Files are pre-compiled (see 'supported formats');

For examples, see the `/tests` directory.

But globals are bad, right? Why make this? I need this functionality for [a project](https://github.com/ShMcK/tut-viewer).

### Supported formats

  * ES5
  * ES6 (Babel)
  * Typescript

### Examples (using Mocha & Chai)

##### ES5

/file.js
```js
function addOne(x) {
  return x + 1;
}
```

/test.js
```js
var expect = require('chai').expect;
// load 'test-context' module
var context = require('test-context');
// currently only works with absolute paths
context(__dirname + '/file.js');

describe('addOne', function() {
  it('increments the input', function() {
    expect(addOne(1)).to.equal(2);
  });
});
```

##### ES6 (ES2015)

/file.js
```js
const addOne = (x) => x + 1;
```

/test.js
```js
var expect = require('chai').expect;
var context = require('test-context');
// ES6 requires an additional parameter { babel: true }
// pass in Babel options by adding { babelOptions: { ... } }
context(__dirname + '/file.js', { babel: true });

describe('addOne', function() {
  it('increments the input', function() {
    expect(addOne(1)).to.equal(2);
  });
});
```

##### Typescript

/file.ts
```ts
const addOne = (x: number): number => x + 1;
```

/test.js
```js
var expect = require('chai').expect;
var context = require('test-context');
// pass in ts options by adding { tsOptions: { ... } }
context(__dirname + '/file.ts');

describe('addOne', function() {
  it('increments the input', function() {
    expect(addOne(1)).to.equal(2);
  });
});
```
