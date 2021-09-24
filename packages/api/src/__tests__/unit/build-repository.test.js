const createBuildRepository = require('../../lib/build-repository');
const testDataLoader = require('../__fixtures__/test-data-loader');

describe('Build Repository', () => {
  let repo;

  beforeEach(async () => {
    repo = await createBuildRepository({ dataLoader: testDataLoader });
  });

  it('returns all active builds', async () => {
    const data = repo.active();

    expect(data).toHaveLength(1);
  });

  it('returns an active build', async () => {
    const data = repo.findById(1);

    expect(data.id).toBe(1);
  });

  it('does not return an inactive build', async () => {
    const data = repo.findById(2);

    expect(data).toBeUndefined();
  });

  it('does not return a build that does not exist', async () => {
    const data = repo.findById(1337);

    expect(data).toBeUndefined();
  });
});
