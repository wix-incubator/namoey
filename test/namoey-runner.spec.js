'use strict';

const expect = require('chai').expect;
const helpers = require('yeoman-test');

const NamoeyRunner = require('../src/namoey-runner');

describe('NamoeyFactory', () => {

  describe('run', () => {

    it('should be fine if a command exited with code 0', done => {
      const runner = new NamoeyRunner({
        generators: [{namespace: 'gene', generator: helpers.createDummyGenerator()}],
        prompts: {},
        args: '',
        options: {},
        shellCommands: ['echo test', 'exit 0', 'echo still good']
      });

      runner.run('gene').then(() => {
        done();
      });
    });

    it('should not be fine if a command exited with code other than 0', done => {
      const runner = new NamoeyRunner({
        generators: [{namespace: 'gene', generator: helpers.createDummyGenerator()}],
        prompts: {},
        args: '',
        options: {},
        shellCommands: ['echo test', 'exit 1', 'echo missing']
      });

      runner.run('gene').catch(err => {
        expect(err.message).to.be.equal(`Execution of 'exit 1' faild with exit code 1`);
        done();
      });
    });
  });
});
