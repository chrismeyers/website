require('dotenv/config');
const path = require('path');
const process = require('process');
const createApp = require('./app');
const createBuildsRepository = require('./lib/builds-repository');
const createProjectsRepository = require('./lib/projects-repository');
const createResumeParser = require('./lib/resume-parser');
const dataLoader = require('./lib/data-loader');

const start = async () => {
  try {
    const app = await createApp(
      [
        {
          name: 'repos',
          value: {
            builds: createBuildsRepository(dataLoader),
            projects: createProjectsRepository(dataLoader),
          },
        },
        {
          name: 'resumeParser',
          value: createResumeParser(
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
          ),
        },
      ],
      {
        logger: {
          level: 'info',
          transport: {
            target:
              process.env.NODE_ENV === 'development'
                ? 'pino-pretty'
                : 'pino/file',
          },
        },
        trustProxy: true,
      },
    );

    const port = app.config.PORT;
    const host = app.config.ADDR;

    await app.listen({ port, host });

    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.once(signal, async () => {
        // eslint-disable-next-line no-console
        console.warn(`Received ${signal}`);
        try {
          await app.close();
          // eslint-disable-next-line no-console
          console.warn('Successfully closed server');
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
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
