const createProjectRepository = ({ dataLoader: loader }) => {
  const type = 'projects';

  return {
    active: async () => {
      const data = await loader(type);
      return data.filter((p) => p.active);
    },
    findById: async (id) => {
      const data = await loader(type);
      return data.find((p) => p.id === id && p.active);
    },
  };
};

module.exports = createProjectRepository;
