import React from 'react';
import {
  CountrySelector,
  filterCountries,
  SEARCH_COUNTRIES_PLACEHOLDER_TEXT,
} from '.';
import { CountryInfo } from '../../store/country/models';
import { fireEvent } from '@testing-library/react-native';
import { setCountryName } from '../../store/actions';
import { navigateBack } from '../../store/navigation/actions';
import { mountComponent } from '../../testUtils';

describe('CountrySelector', () => {
  it('filters the country list based on search query', () => {
    const { getByPlaceholderText, queryByText } = mountComponent(
      <CountrySelector />,
    );

    const searchInput = getByPlaceholderText(SEARCH_COUNTRIES_PLACEHOLDER_TEXT);
    fireEvent.changeText(searchInput, 'South');

    expect(queryByText('South Africa')).not.toBeNull();
    expect(queryByText('Afghanistan')).toBeNull();

    fireEvent.changeText(searchInput, 'Afghan');

    expect(queryByText('South Africa')).toBeNull();
    expect(queryByText('Afghanistan')).not.toBeNull();
  });

  it('sets the country name on press', () => {
    const { getByText, store } = mountComponent(
      <CountrySelector />,
      undefined,
      true,
    );

    const countryName = 'Afghanistan';
    fireEvent.press(getByText(countryName));

    expect(store.dispatch).toHaveBeenCalledWith(setCountryName(countryName));
    expect(store.dispatch).toHaveBeenCalledWith(navigateBack());
  });

  describe('filterCountries', () => {
    const getTestCountryInfo = (
      name: string,
      withIoc?: boolean,
    ): CountryInfo => {
      return {
        name,
        ioc: withIoc ? '1' : '',
        emoji: '',
        currencies: [],
        countryCallingCodes: [],
      };
    };
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
