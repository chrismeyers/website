const createProjectsRepository = require('../../lib/builds-repository');
const testDataLoader = require('../__fixtures__/test-data-loader');

describe('Projects Repository', () => {
  let repo;

  beforeEach(() => {
    repo = createProjectsRepository(testDataLoader);
  });

  it('returns all active projects', () => {
    const data = repo.active();

    expect(data).toHaveLength(1);
  });

  it('returns an active project', () => {
    const data = repo.findById(1);

    expect(data.id).toBe(1);
  });

  it('does not return an inactive project', () => {
    const data = repo.findById(2);

    expect(data).toBeUndefined();
  });

  it('does not return a project that does not exist', () => {
    const data = repo.findById(1337);

    expect(data).toBeUndefined();
  });
});
