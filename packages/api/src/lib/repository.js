const createRepository = ({ dataLoader }) => {
  let data = [];

  const load = (type) => {
    data = dataLoader(type);
  };

  const active = () => {
    return data.filter((item) => item.active);
  };

  const findById = (id) => {
    return data.find((item) => item.id === id && item.active);
  };

  return {
    load,
    active,
    findById,
  };
};

module.exports = (dataLoader) => {
  const builds = createRepository({ dataLoader });
  builds.load('builds');

  const projects = createRepository({ dataLoader });
  projects.load('projects');

  return { builds, projects };
};
