const createBuildsRepository = require('../../lib/builds-repository');
const testDataLoader = require('../__fixtures__/test-data-loader');

describe('Builds Repository', () => {
  let repo;

  beforeEach(() => {
    repo = createBuildsRepository(testDataLoader);
  });

  it('returns all active builds', () => {
    const data = repo.active();

    expect(data).toHaveLength(3);
  });

  it('returns an active build', () => {
    const data = repo.findById(1);

    expect(data.id).toBe(1);
  });

  it('does not return an inactive build', () => {
    const data = repo.findById(4);

    expect(data).toBeUndefined();
  });

  it('does not return a build that does not exist', () => {
    const data = repo.findById(1337);

    expect(data).toBeUndefined();
  });
});
