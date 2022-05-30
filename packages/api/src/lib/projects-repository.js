const createRepository = require('./repository');

const createProjectsRepository = (dataLoader) => {
  const repo = createRepository({ dataLoader });
  repo.load('projects');
  return repo;
};

module.exports = createProjectsRepository;
