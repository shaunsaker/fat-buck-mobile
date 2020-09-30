import { filterCountries } from '.';
import { CountryInfo } from '../../store/country/models';

const getTestCountryInfo = (name: string, withIoc?: boolean): CountryInfo => {
  return {
    name,
    ioc: withIoc ? '1' : '',
    emoji: '',
    currencies: [],
    countryCallingCodes: [],
  };
};

describe('CountrySelector', () => {
  describe('filterCountries', () => {
    const countryNames = ['South Africa', 'south albania', 'North albania'];
    const countries = countryNames.map((name) => getTestCountryInfo(name));

    it('returns all countries when the searchValue is empty', () => {
      const searchValue = '';
      const result = filterCountries(countries, searchValue);
      const expected = countries;
      expect(result).toEqual(expected);
    });

    it('returns matched countries when the searchValue matches', () => {
      const searchValue = 'South';
      const result = filterCountries(countries, searchValue);
      const expected = [countries[0], countries[1]];
      expect(result).toEqual(expected);
    });

    it('does not return any countries when the searchValue does not match', () => {
      const searchValue = 'Unique';
      const result = filterCountries(countries, searchValue);
      const expected: CountryInfo[] = [];
      expect(result).toEqual(expected);
    });
  });
});
