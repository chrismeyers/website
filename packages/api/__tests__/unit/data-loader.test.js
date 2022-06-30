const fs = require('fs');
const dataLoader = require('../../src/lib/data-loader');

describe('Data Loader', () => {
  it('returns entire parsed JSON object', () => {
    const spy = jest.spyOn(fs, 'readFileSync').mockReturnValue('{"a":1,"b":2}');

    const data = dataLoader();

    expect(spy).toHaveBeenCalled();
    expect(data).toEqual({ a: 1, b: 2 });
  });

  it('returns parsed JSON sub object', async () => {
    const spy = jest.spyOn(fs, 'readFileSync').mockReturnValue('{"a":{"b":2}}');

    const data = dataLoader('a');

    expect(spy).toHaveBeenCalled();
    expect(data).toEqual({ b: 2 });
  });
});
