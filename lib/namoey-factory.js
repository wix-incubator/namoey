'use strict';

class NamoeyFactory {

  constructor(options) {
    options = options || {};

    this._generator = options.generator || null;
    this._prompts = options.prompts || {};
    this._options = options.options || {};

    this._stepCallback = options.stepCallback || function noop() {};
    this._shellCommands = options.shellCommandss || [];
    this._sandboxPath = options.sandboxPath || this._getSandboxPath();
  }

  setGenerator(generator) {
    this._generator = generator;
    return this;
  }

  setPrompt(prompts) {
    this._prompts = prompts;
    return this;
  }

  setOptions(opts) {
    this._options = opts;
    return this;
  }

  setStepCallback(cb) {
    this._stepCallback = cb;
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

  setSandboxPath(path) {
    this._sandboxPath = path;
    return this;
  }

  _getSandboxPath() {
    // Complex logic here
  }

  run() {
    // Create a new instance of namoey and return it.
  }
}

module.exports = NamoeyFactory;
