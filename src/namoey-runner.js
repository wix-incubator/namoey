'use strict';

const _ = require('lodash');
const helpers = require('yeoman-test');
const shell = require('shelljs');

class NamoeyRunner {

  constructor(options) {
    this._silent = (typeof options.silent === 'undefined' ? true : options.silent);

    this._generators = options.generators;
    this._prompts = options.prompts;
    this._args = options.args;
    this._options = options.options;
    this._shellCommands = options.shellCommands;
  }

  run(genNamespace) {
    return new Promise((resolve, reject) => {

      const gen = _.find(this._generators, g => g.namespace === genNamespace);

      if (!gen) {
        reject(new Error(`Generator '${genNamespace}' is not exist`));
      }

      helpers.run(gen.generator)
        .withOptions(this._options)
        .withArguments(this._args)
        .withPrompts(this._prompts)
        .withGenerators(this._generators.map(g => [g.generator, g.namespace]))

        .inTmpDir(dir => shell.cd(dir))

        .on('error', err => {
          reject(err);
        })

        .on('end', () => {
          this._shellCommands.every(cmd => {
            const exitCode = shell.exec(cmd, {silent: this._silent}).code;
            if (exitCode !== 0) {
              reject(new Error(`Execution of '${cmd}' faild with exit code ${exitCode}`));
            }
            return exitCode === 0;
          });

          resolve();
        });
    });
  }
}

module.exports = NamoeyRunner;
