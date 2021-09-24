const path = require('path');
const { asFunction, asValue } = require('awilix');
const testDataLoader = require('./test-data-loader');
const createProjectRepository = require('../../lib/project-repository');
const createBuildRepository = require('../../lib/build-repository');
const createResumeParser = require('../../lib/resume-parser');

module.exports = {
  dataLoader: asValue(testDataLoader),
  projectRepository: asFunction(createProjectRepository),
  buildRepository: asFunction(createBuildRepository),
  resumePath: asValue(path.join(__dirname, 'test-resume.latex')),
  resumeParser: asFunction(createResumeParser),
};
