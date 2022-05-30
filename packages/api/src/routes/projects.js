const S = require('fluent-json-schema');

module.exports = async (app) => {
  app.get('/projects', {
    schema: {
      response: {
        200: S.object().prop(
          'items',
          S.array().items(S.ref('schema#projectResponse')),
        ),
      },
    },
    handler: async (request, reply) => {
      const { projects } = request.repos;

      return reply.send({ items: projects.active() });
    },
  });

  app.get('/projects/:id', {
    schema: {
      params: S.object().prop('id', S.number().required()),
      response: {
        200: S.ref('schema#projectResponse'),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { projects } = request.repos;

      const project = projects.findById(id);

      if (project) return reply.send(project);

      return reply.notFound(`Project ${id} not found`);
    },
  });
};
