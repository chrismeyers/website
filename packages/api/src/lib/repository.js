/**
 * @typedef Repository
 * @property {(type: string) => Promise<void>} load
 * @property {() => any[]} active
 * @property {(id: number) => (any|undefined)} findById
 */

const createRepository = ({ dataLoader }) => {
  let data = [];

  const load = async (type) => {
    data = await dataLoader(type);
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
