import { MOCKED_MOMENT_ISO_STRING } from '../../__mocks__/moment';
import { getDateString } from './getDateString';

describe('getDateString', () => {
  it('returns the mocked moment iso string', () => {
    const result = getDateString();
    const expected = MOCKED_MOMENT_ISO_STRING;
    expect(result).toEqual(expected);
  });
});
