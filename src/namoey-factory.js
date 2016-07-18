'use strict';

const Runner = require('./namoey-runner');

class NamoeyFactory {

  constructor(options) {
    options = options || {};

    this._silent = (typeof options.silent === 'undefined' ? true : options.silent);

    this._generators = options.generators || [];
    this._prompts = options.prompts || {};
    this._args = options.args || '';
    this._options = options.options || {};
    this._shellCommands = options.shellCommands || [];
  }

  setGenerators(generators) {
    this._generators = generators;
    return this;
  }

  addGenerator(generator) {
    this._generators.push(generator);
    return this;
  }

  setPrompts(prompts) {
    this._prompts = prompts;
    return this;
  }

  setArgs(args) {
    this._args = args;
    return this;
  }

  setOptions(opts) {
    this._options = opts;
    return this;
  }

  setShellCommands(cmds) {
    this._shellCommands = cmds;
    return this;
  }

  addShellCommand(cmd) {
    this._shellCommands.push(cmd);
    return this;
  }

  createRunner() {
    return new Runner({
      silent: this._silent,
      generators: this._generators,
      prompts: this._prompts,
      args: this._args,
      options: this._options,
      shellCommands: this._shellCommands
    });
  }
}

module.exports = NamoeyFactory;
