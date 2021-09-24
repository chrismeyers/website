const createProjectRepository = require('../../lib/project-repository');
const testDataLoader = require('../__fixtures__/test-data-loader');

describe('Project Repository', () => {
  let repo;

  beforeEach(async () => {
    repo = await createProjectRepository({ dataLoader: testDataLoader });
  });

  it('returns all active projects', async () => {
    const data = repo.active();

    expect(data).toHaveLength(1);
  });

  it('returns an active project', async () => {
    const data = repo.findById(1);

    expect(data.id).toBe(1);
  });

  it('does not return an inactive project', async () => {
    const data = repo.findById(2);

    expect(data).toBeUndefined();
  });

  it('does not return a project that does not exist', async () => {
    const data = repo.findById(1337);

    expect(data).toBeUndefined();
  });
});
