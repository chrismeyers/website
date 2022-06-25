const S = require('fluent-json-schema');

module.exports = async (app) => {
  app.get('/resume', {
    schema: {
      response: {
        200: S.ref('schema#resume'),
      },
    },
    handler: async (request, reply) => {
      const { resumeParser: parser } = app;

      return reply.send({
        experience: parser.parseComplexSection('Experience'),
        education: parser.parseComplexSection('Education'),
        skills: parser.parseListSection('TechnicalSkills'),
      });
    },
  });

  app.get('/resume/summary', {
    schema: {
      response: {
        200: S.ref('schema#resumeSummary'),
      },
    },
    handler: async (request, reply) => {
      const { resumeParser: parser } = app;

      return reply.send({
        languages: parser.getLanguages(),
        mostRecentJob: parser.getMostRecentJob(),
      });
    },
  });
};
