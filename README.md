# namoey

> Yeoman generators tester

`namoey` (yeoman spelled backwards) runs your generator and some additional shell scripts in a sandbox to make sure your generated projects won't fail at start.

The idea here is to check if the generated project generated correctly - not by the files, but by their functionality. For example, you may include some dummy tests in your generator. To make sure they are working correctly, you can run the test runner manually, or automate this process with `nemoey`.

## Install

```console
npm install namoey --save
```

## Simple usage

```javascript
const namoey = require('namoey');
const generatorWebapp = require('./generators/app');

// Basic settings
const test = namoey({silent: true})
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
runner.run('webapp:app').then(() => { ... }).catch((err) => { ... });
```
