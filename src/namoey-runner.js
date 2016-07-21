'use strict';

const path = require('path');
const _ = require('lodash');
const helpers = require('yeoman-test');
const shell = require('shelljs');
const boxen = require('boxen');

const utils = require('./utils');

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
        .withGenerators(_.without(this._generators, gen).map(g => [g.generator, g.namespace]))

        .inTmpDir(dir => shell.cd(dir))

        .on('error', err => {
          reject(err);
        })

        .on('end', () => {
          this._shellCommands.every(cmd => {

            if (!this._silent) {
              console.log(boxen(`Running Script: '${cmd}'`, {padding: 1, margin: 1, borderColor: 'yellow'}));
            }

            const cdRegexp = /^(?:cd\s)([\S|\/|\.|.]+)+$/i;
            const cdResult = cmd.match(cdRegexp);

            if (cdResult) {
              shell.cd(path.join(shell.pwd().stdout, cdResult[1]));
              return true;
            }

            const exitCode = shell.exec(utils.normalizeCommandWithNvm(cmd), {silent: this._silent}).code;
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
