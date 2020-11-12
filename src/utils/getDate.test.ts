import { MOCKED_MOMENT_ISO_STRING } from '../../jest/setup';
import { getDate } from './getDate';

describe('getDate', () => {
  it('returns the mocked moment iso string', () => {
    const result = getDate();
    const expected = MOCKED_MOMENT_ISO_STRING;
    expect(result).toEqual(expected);
  });
});
