'use strict';

const shelljs = require('shelljs');

/**
 * Taken from:
 * https://github.com/wix-private/wnpm/blob/master/wnpm-dev/lib/commons.js
 */
module.exports.normalizeCommandWithNvm = cmd => {
  if (cmd.indexOf('nvm') !== 0) {
    return cmd;
  }

  // we unset because when running this code under npm test (i.e. when we ourselves are testing it),
  // then npm sets lots of variables, including npm_config_prefix, which rekes havoc out of nvm
  // (only in CI!)
  // the ~/.nvm/nvm.sh is to make nvm work in he current command. The --install is arcane wizardy
  // found somewhere in Googleland.
  // And, no, don't think about turning those ";" into "&". In CI this will fail miserably
  // for reasons I do not entirely comprehend.
  const doStuffToMakeNvmWorkBeforeRunning = 'unset npm_config_prefix; . ~/.nvm/nvm.sh --silent; ';

  if (cmd.indexOf('nvm exec ') === 0) {
    if (shelljs.test('-f', '.nvmrc')) {
      return doStuffToMakeNvmWorkBeforeRunning + cmd;
    } else {
      // I don't know why, but nvm run/install/... can live without an .nvmrc, but nvm exec can't. Go figure.
      // But if .nvmrc doesn't exist, then I don't care to run under nvm, so I can just execute stuff directly
      return cmd
        .replace(/nvm exec/g, '')
        .replace(/nvm run/g, 'node');
    }
  } else {
    return doStuffToMakeNvmWorkBeforeRunning + cmd;
  }
};
