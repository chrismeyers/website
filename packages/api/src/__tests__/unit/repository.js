const createRepos = require('../../lib/repository');
const testDataLoader = require('../__fixtures__/test-data-loader');

describe('Repositories', () => {
  let builds;
  let projects;

  beforeEach(() => {
    ({ builds, projects } = createRepos(testDataLoader));
  });

  describe('builds repository', () => {
    it('returns all active builds', () => {
      const data = builds.active();

      expect(data).toHaveLength(1);
    });

    it('returns an active build', () => {
      const data = builds.findById(1);

      expect(data.id).toBe(1);
    });

    it('does not return an inactive build', () => {
      const data = builds.findById(2);

      expect(data).toBeUndefined();
    });

    it('does not return a build that does not exist', () => {
      const data = builds.findById(1337);

      expect(data).toBeUndefined();
    });
  });

  describe('projects repository', () => {
    it('returns all active projects', () => {
      const data = projects.active();

      expect(data).toHaveLength(1);
    });

    it('returns an active project', () => {
      const data = projects.findById(1);

      expect(data.id).toBe(1);
    });

    it('does not return an inactive project', () => {
      const data = projects.findById(2);

      expect(data).toBeUndefined();
    });

    it('does not return a project that does not exist', () => {
      const data = projects.findById(1337);

      expect(data).toBeUndefined();
    });
  });
});
