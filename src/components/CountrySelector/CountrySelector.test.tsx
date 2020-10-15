import React from 'react';
import {
  CountrySelector,
  filterCountries,
  SEARCH_COUNTRIES_PLACEHOLDER_TEXT,
} from '.';
import { CountryInfo } from '../../store/country/models';
import { render, fireEvent } from '@testing-library/react-native';
import { store } from '../../store';
import { Provider } from 'react-redux';
import { setCountryName } from '../../store/actions';
import { navigateBack } from '../../store/navigation/actions';

describe('CountrySelector', () => {
  const mountComponent = () => {
    const mockStore = store;
    store.dispatch = jest.fn();

    const component = (
      <Provider store={mockStore}>
        <CountrySelector />
      </Provider>
    );

    return render(component);
  };

  it('filters the country list based on search query', () => {
    const { getByPlaceholderText, getByText } = mountComponent();

    fireEvent.changeText(
      getByPlaceholderText(SEARCH_COUNTRIES_PLACEHOLDER_TEXT),
      'South',
    );

    expect(getByText('South Africa')).toBeDefined();
  });

  it('sets the country name on press', () => {
    const { getByText } = mountComponent();

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
