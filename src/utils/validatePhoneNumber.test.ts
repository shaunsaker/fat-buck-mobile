import { validatePhoneNumber } from './validatePhoneNumber';

describe('validatePhoneNumber', () => {
  it('returns true for a valid phone number', () => {
    const result = validatePhoneNumber('+27833771130');
    const expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false for an invalid phone number', () => {
    const result = validatePhoneNumber('1234');
    const expected = false;
    expect(result).toEqual(expected);
  });
});
