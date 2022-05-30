const S = require('fluent-json-schema');

module.exports = async (app) => {
  app.get('/builds', {
    schema: {
      response: {
        200: S.object().prop(
          'items',
          S.array().items(S.ref('schema#buildResponse')),
        ),
      },
    },
    handler: async (request, reply) => {
      const { builds } = request.repos;

      return reply.send({ items: builds.active() });
    },
  });

  app.get('/builds/:id', {
    schema: {
      params: S.object().prop('id', S.number().required()),
      response: {
        200: S.ref('schema#buildResponse'),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { builds } = request.repos;

      const build = builds.findById(id);

      if (build) return reply.send(build);

      return reply.notFound(`Build ${id} not found`);
    },
  });
};
