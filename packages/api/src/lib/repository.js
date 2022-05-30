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

module.exports = createRepository;
