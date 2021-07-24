const createProjectRepository = ({ dataLoader: loader }) => {
  const type = 'builds';

  return {
    active: async () => {
      const data = await loader(type);
      return data.filter((b) => b.active);
    },
    findById: async (id) => {
      const data = await loader(type);
      return data.find((b) => b.id === id && b.active);
    },
  };
};

module.exports = createProjectRepository;
