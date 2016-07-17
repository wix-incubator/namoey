# namoey

> The Yeoman generators tester

Namoey runs your generator and some additional shell scripts in a sandbox to make sure your generated projects won't fail at start.

## Install

```console
npm install namoey --save
```

## Simple usage

```javascript
const namoey = require('namoey');
const generatorWebapp = require('./generators/app');

// Basic settings
const test = namoey()
              .setGenerators([{namespace: 'webapp:app', generator: generatorWebapp}]) // Make sure to add sub-generator for composability
              .setPrompts({name: 'my-cool-project', description: 'awesome stuff'})
              .setArgs('my-app')
              .setOptions({coffescript: true});

// Those shell commands will be run after yeoman is done
test.setShellCommands([
  'npm install',
  'npm run build && npm run test'
]);
test.addShellCommand('echo done');

// Start the madness
const runner = test.createRunner();
runner.run('webapp:app').then((stdout) => { ... }).catch((stdout) => { ... });
```
