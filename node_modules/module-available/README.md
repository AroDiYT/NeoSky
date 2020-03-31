[![Build Status](https://travis-ci.org/kownacki/module-available.svg?branch=master)](https://travis-ci.org/kownacki/module-available)

# module-available

Test whether a module is available as a dependency

## Installation

$ npm install module-available

## API

```javascript
var moduleAvailable = require("module-available");
```

```javascript
moduleAvailable(moduleName) -> boolean
```

+ *moduleName* - Same string with a module's name that can be passed to `require`. This should be a module from node_modules.

Returns `true` if and only if the requested module is available to be required. Otherwise returns `false`.

## License

MIT
