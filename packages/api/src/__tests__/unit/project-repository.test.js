const createProjectRepository = require('../../lib/project-repository');
const mockDataLoader = require('../../__mocks__/mock-data-loader');

describe('Project Repository', () => {
  let repo;

  beforeEach(async () => {
    repo = await createProjectRepository({ dataLoader: mockDataLoader });
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
