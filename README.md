<h1 align="center">
<img width="241" src ="media/yeoman-rotated.png" />
<br>
namoey
</h1>

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

// Start the madness
const runner = test.createRunner();
runner.run('webapp:app').then(() => { ... }).catch((err) => { ... });

// If you care about logging, you can tag a runner
// by simply providing a tag string. The following example
// will print something like this for each log made
// by a shell script:
// `----->[NAMOEY:'second run']`
runner.run('webapp:app', 'second run');
```

### Notes:

- Avoid `&&`, `||` and `&` in a shell command to improve debugging.
- You can `cd` inside a shell command, just make sure to stay within the generated location
