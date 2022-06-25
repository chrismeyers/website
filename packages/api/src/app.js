const path = require('path');
const fastify = require('fastify');
const fastifyCors = require('@fastify/cors');
const fastifyHelmet = require('@fastify/helmet');
const fastifyEnv = require('@fastify/env');
const fastifyAutoLoad = require('@fastify/autoload');
const fastifySensible = require('@fastify/sensible');
const S = require('fluent-json-schema');
const schemas = require('./lib/schema');

module.exports = async (decorations = [], opts = {}) => {
  const app = fastify(opts);

  // Register plugins
  await app.register(fastifyEnv, {
    dotenv: true,
    schema: S.object()
      .prop('NODE_ENV', S.string().required())
      .prop(
        'CORS_ALLOWED_ORIGINS',
        S.raw({ type: 'string', separator: ',' }).required(),
      )
      .prop('PORT', S.number().default(8888))
      .prop('ADDR', S.string().default('127.0.0.1')),
  });
  app.register(fastifyCors, {
    origin: app.config.CORS_ALLOWED_ORIGINS,
  });
  app.register(fastifyHelmet);
  app.register(fastifySensible);

  // Register routes
  app.register(fastifyAutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: false,
  });

  // Register schemas
  app.addSchema(schemas);

  // Decorate server instance
  decorations.forEach(({ name, value }) => {
    app.decorate(name, value);
  });

  return app;
};
