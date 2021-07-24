const createRepository = require('./repository');

const createBuildRepository = async ({ dataLoader }) => {
  const repo = createRepository({ dataLoader });
  await repo.load('builds');
  return repo;
};

module.exports = createBuildRepository;
