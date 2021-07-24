const path = require('path');
const { asFunction, asValue } = require('awilix');
const dataLoader = require('./lib/data-loader');
const createProjectRepository = require('./lib/project-repository');
const createBuildRepository = require('./lib/build-repository');
const createResumeParser = require('./lib/resume-parser');

module.exports = {
  dataLoader: asValue(dataLoader),
  projectRepository: asFunction(createProjectRepository).singleton(),
  buildRepository: asFunction(createBuildRepository).singleton(),
  resumePath: asValue(
    path.join(
      __dirname,
      '..',
      '..',
      '..',
      'resume',
      'LaTeX',
      'Meyers_Chris',
      'Meyers_Chris_Resume.tex',
    ),
  ),
  resumeParser: asFunction(createResumeParser).singleton(),
};
