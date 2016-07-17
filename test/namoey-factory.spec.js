'use strict';

const expect = require('chai').expect;

const NamoeyFactory = require('../src/namoey-factory');
const NamoeyRunner = require('../src/namoey-runner');

describe('NamoeyFactory', () => {

  describe('createRunner', () => {

    it('should return an instance of NameoeyRunner', () => {
      expect(new NamoeyFactory().createRunner()).to.be.instanceOf(NamoeyRunner);
    });
  });
});
