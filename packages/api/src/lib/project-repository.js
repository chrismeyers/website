const createRepository = require('./repository');

const createProjectRepository = async ({ dataLoader }) => {
  const repo = createRepository({ dataLoader });
  await repo.load('projects');
  return repo;
};

module.exports = createProjectRepository;
