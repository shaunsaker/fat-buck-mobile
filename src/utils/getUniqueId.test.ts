import { getUniqueId } from './getUniqueId';

describe('getUniqueId', () => {
  it('returns a string', () => {
    const result = getUniqueId();
    expect(typeof result).toEqual('string');
  });
});
