const createApp = require('../../app');
const createBuildsRepository = require('../../lib/builds-repository');
const createProjectsRepository = require('../../lib/projects-repository');
const testDataLoader = require('../__fixtures__/test-data-loader');

describe('Project API Endpoints', () => {
  let app;

  beforeEach(async () => {
    app = await createApp([
      {
        name: 'repos',
        value: {
          builds: createBuildsRepository(testDataLoader),
          projects: createProjectsRepository(testDataLoader),
        },
      },
    ]);
  });

  afterEach(() => app.close());

  it('should return an error when decorators are missing', async () => {
    app = await createApp();

    const response = await app.inject({
      method: 'GET',
      url: '/projects',
    });

    expect(response.statusCode).toBe(500);
  });

  it('gets all active projects', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      items: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          active: expect.any(Boolean),
          title: expect.any(String),
          webUrl: expect.toBeOneOf([expect.any(String), null]),
          codeUrl: expect.any(String),
          displayDate: expect.any(String),
          startedDate: expect.any(String),
          lang: expect.any(String),
          info: expect.any(String),
          role: expect.any(String),
          stat: expect.any(String),
          images: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              path: expect.any(String),
              thumbnail: expect.toBeOneOf([expect.any(String), null]),
              title: expect.any(String),
              pos: expect.any(Number),
              orient: expect.any(String),
            }),
          ]),
        }),
      ]),
    });
  });

  it('handles an invalid ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/apples',
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: 'params.id should be number',
      }),
    );
  });

  it('handles an unknown ID', async () => {
    const id = 12345;

    const response = await app.inject({
      method: 'GET',
      url: `/projects/${id}`,
    });

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        message: `Project ${id} not found`,
      }),
    );
  });

  it('gets a single project by ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/1',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        active: expect.any(Boolean),
        title: expect.any(String),
        webUrl: expect.toBeOneOf([expect.any(String), null]),
        codeUrl: expect.any(String),
        displayDate: expect.any(String),
        startedDate: expect.any(String),
        lang: expect.any(String),
        info: expect.any(String),
        role: expect.any(String),
        stat: expect.any(String),
        images: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            path: expect.any(String),
            thumbnail: expect.toBeOneOf([expect.any(String), null]),
            title: expect.any(String),
            pos: expect.any(Number),
            orient: expect.any(String),
          }),
        ]),
      }),
    );
  });
});
