require('dotenv').config();
const path = require('path');
const process = require('process');
const createApp = require('./app');
const createRepos = require('./lib/repository');
const createResumeParser = require('./lib/resume-parser');
const dataLoader = require('./lib/data-loader');

const start = async () => {
  try {
    const app = await createApp({
      logger: {
        level: 'info',
        prettyPrint: process.env.NODE_ENV === 'development',
      },
    });

    const repos = createRepos(dataLoader);
    const resumeParser = createResumeParser(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'resume',
        'LaTeX',
        'Meyers_Chris',
        'Meyers_Chris_Resume.tex',
      ),
    );

    app.decorateRequest('repos', null);
    app.decorateRequest('resumeParser', null);
    app.addHook('onRequest', (request, reply, done) => {
      request.repos = repos;
      request.resumeParser = resumeParser;
      done();
    });

    const port = app.config.PORT;
    const addr = app.config.ADDR;

    await app.listen(port, addr);

    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.on(signal, async () => {
        app.log.warn(`Received ${signal}`);
        try {
          await app.close();
          app.log.warn('Successfully closed server');
        } catch (error) {
          app.log.error(error);
        }
      });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};

start();
