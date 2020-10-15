import { getRandomId } from './getRandomId';

describe('getRandomId', () => {
  it('returns a string', () => {
    const result = getRandomId();
    expect(typeof result).toEqual('string');
  });
});
