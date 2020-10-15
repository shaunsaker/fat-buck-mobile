import { validateEmail } from './validateEmail';

describe('validateEmail', () => {
  it('returns true for a valid email', () => {
    const result = validateEmail('sakershaun@gmail.com');
    const expected = true;
    expect(result).toEqual(expected);
  });

  it('returns false for an invalid email', () => {
    const result = validateEmail('sakershaun');
    const expected = false;
    expect(result).toEqual(expected);
  });
});
