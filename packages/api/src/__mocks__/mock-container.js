const path = require('path');
const { asFunction, asValue } = require('awilix');
const mockDataLoader = require('./mock-data-loader');
const createProjectRepository = require('../lib/project-repository');
const createBuildRepository = require('../lib/build-repository');
const createResumeParser = require('../lib/resume-parser');

module.exports = {
  dataLoader: asValue(mockDataLoader),
  projectRepository: asFunction(createProjectRepository),
  buildRepository: asFunction(createBuildRepository),
  resumePath: asValue(
    path.join(__dirname, 'data', 'resume', 'test_resume.tex'),
  ),
  resumeParser: asFunction(createResumeParser),
};
