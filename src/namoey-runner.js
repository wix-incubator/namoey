'use strict';

const path = require('path');
const _ = require('lodash');
const helpers = require('yeoman-test');
const shell = require('shelljs');

const utils = require('./utils');

class NamoeyRunner {

  constructor(options) {
    this._silent = (typeof options.silent === 'undefined' ? true : options.silent);

    this._generators = options.generators;
    this._prompts = options.prompts;
    this._args = options.args;
    this._options = options.options;
    this._shellCommands = options.shellCommands;
    this._directory = options.directory;
  }

  _log(tagString, ...msgs) {
    if (!this._silent) {
      const tag = tagString ? `[NAMOEY:${tagString}]` : '[NAMOEY]';
      msgs.forEach(msg => console.log(`-----> ${tag} ${msg}`));
    }
  }

  run(genNamespace, tagString = '') {
    return new Promise((resolve, reject) => {

      const gen = _.find(this._generators, g => g.namespace === genNamespace);

      const cd = dir => {
        shell.cd(dir);
        this._log(tagString, `Running generaor '${genNamespace}' inside:`, `${dir}`);
      };

      if (!gen) {
        reject(new Error(`Generator '${genNamespace}' is not exist`));
      }

      const runner = helpers.run(gen.generator)
        .withOptions(this._options)
        .withArguments(this._args)
        .withPrompts(this._prompts)
        .withGenerators(_.without(this._generators, gen).map(g => [g.generator, g.namespace]));

      if (this._directory) {
        runner.inDir(this._directory, cd);
      } else {
        runner.inTmpDir(cd);
      }

      runner
        .on('error', err => {
          reject(err);
        })

        .on('end', () => {
          this._shellCommands.every(cmd => {

            this._log(tagString, `Running Script: '${cmd}'`);

            const cdRegexp = /^(?:cd\s)([\S|/|.|.]+)+$/i;
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
