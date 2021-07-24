const createRepository = ({ dataLoader }) => ({
  data: {},
  async load(type) {
    this.data = await dataLoader(type);
  },
  active() {
    return this.data.filter((item) => item.active);
  },
  findById(id) {
    return this.data.find((item) => item.id === id && item.active);
  },
});

module.exports = createRepository;
