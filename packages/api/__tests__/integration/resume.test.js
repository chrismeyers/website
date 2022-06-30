const path = require('path');
const createApp = require('../../src/app');
const createResumeParser = require('../../src/lib/resume-parser');

describe('Resume API Endpoints', () => {
  let app;

  beforeEach(async () => {
    app = await createApp([
      {
        name: 'resumeParser',
        value: createResumeParser(
          path.join(__dirname, '..', '__fixtures__', 'test-resume.latex'),
        ),
      },
    ]);
  });

  afterEach(() => app.close());

  it('should return an error when decorators are missing', async () => {
    app = await createApp();

    const response = await app.inject({
      method: 'GET',
      url: '/resume',
    });

    expect(response.statusCode).toBe(500);
  });

  it('gets full resume', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/resume',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        experience: expect.arrayContaining([
          expect.objectContaining({
            url: expect.any(String),
            firstLine: expect.any(Array),
            secondLine: expect.any(Array),
            info: expect.any(Array),
          }),
        ]),
        education: expect.arrayContaining([
          expect.objectContaining({
            url: expect.any(String),
            firstLine: expect.any(Array),
            secondLine: expect.any(Array),
            info: expect.any(Array),
          }),
        ]),
        skills: expect.arrayContaining([
          expect.objectContaining({
            mainItem: expect.any(String),
            subItems: expect.any(Array),
          }),
        ]),
      }),
    );
  });

  it('gets resume summary', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/resume/summary',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(
      expect.objectContaining({
        languages: expect.objectContaining({
          desktop: expect.any(Array),
          web: expect.any(Array),
        }),
        mostRecentJob: expect.objectContaining({
          employed: expect.any(Boolean),
          company: expect.any(String),
          url: expect.any(String),
          title: expect.any(String),
          dates: expect.any(Array),
        }),
      }),
    );
  });
});
