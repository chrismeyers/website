const createRepository = require('./repository');

const createBuildsRepository = (dataLoader) => {
  const repo = createRepository({ dataLoader });
  repo.load('builds');
  return repo;
};

module.exports = createBuildsRepository;
