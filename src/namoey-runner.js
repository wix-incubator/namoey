'use strict';

const helpers = require('yeoman-test');
const shell = require('shelljs');

class NamoeyRunner {

  constructor(options) {
    this._generators = options.generators;
    this._prompts = options.prompts;
    this._args = options.args;
    this._options = options.options;
    this._shellCommands = options.shellCommands;
  }

  run(genNamespace) {
    return new Promise((resolve, reject) => {

      const gen = this._generators.filter(g => g.namespace === genNamespace);

      // Run the generator
      helpers.run(gen[0].generator)
        .withOptions(this._options)
        .withArguments(this._args)
        .withPrompts(this._prompts)

        .toPromise().then(cwd => {
          shell.cd(cwd);
          this._shellCommands.forEach(cmd => {
            const res = shell.exec(cmd, {silent: true});
            if (res.code !== 0) {
              throw new Error(`Execution of '${cmd}' faild with exit code ${res.code}`);
            }
          });
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = NamoeyRunner;
