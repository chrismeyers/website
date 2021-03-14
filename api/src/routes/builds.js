const dataLoader = require('../lib/data-loader');
const createBuildService = require('../lib/build-service');

module.exports = async (app) => {
  app.get('/builds', async (request, reply) => {
    try {
      const service = createBuildService(dataLoader);
      return { items: await service.active() };
    } catch (error) {
      return reply.internalServerError('Unable to load data');
    }
  });

  app.get('/builds/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const service = createBuildService(dataLoader);
        const build = await service.findById(id);

        if (build) return build;

        return reply.notFound(`Build ${id} not found`);
      } catch (error) {
        return reply.internalServerError('Unable to load data');
      }
    },
  });
};
