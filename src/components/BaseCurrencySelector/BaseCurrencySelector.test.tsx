import React from 'react';
import {
  BaseCurrencySelector,
  filterCurrencies,
  SEARCH_CURRENCIES_PLACEHOLDER_TEXT,
} from '.';
import { fireEvent } from '@testing-library/react-native';
import { navigateBack } from '../../store/navigation/actions';
import { mountComponent } from '../../testUtils/mountComponent';

describe('BaseCurrencySelector', () => {
  it('filters the country list based on search query', () => {
    // TODO: add to the store

    const { getByPlaceholderText, queryByText } = mountComponent(
      <BaseCurrencySelector />,
    );

    const searchInput = getByPlaceholderText(
      SEARCH_CURRENCIES_PLACEHOLDER_TEXT,
    );
    fireEvent.changeText(searchInput, 'USD');

    expect(queryByText('South Africa')).not.toBeNull();
    expect(queryByText('Afghanistan')).toBeNull();

    fireEvent.changeText(searchInput, 'Afghan');

    expect(queryByText('South Africa')).toBeNull();
    expect(queryByText('Afghanistan')).not.toBeNull();
  });

  it('sets the country name on press', () => {
    const { getByText, spy } = mountComponent(
      <BaseCurrencySelector />,
      undefined,
    );

    const countryName = 'Afghanistan';
    fireEvent.press(getByText(countryName));

    expect(spy).toHaveBeenCalledWith(setBaseCurrencyName(countryName));
    expect(spy).toHaveBeenCalledWith(navigateBack());
  });

  describe('filterCurrencies', () => {
    const getTestBaseCurrencyInfo = (
      name: string,
      withIoc?: boolean,
    ): BaseCurrencyInfo => {
      return {
        name,
        ioc: withIoc ? '1' : '',
        emoji: '',
        currencies: [],
        countryCallingCodes: [],
      };
    };
    const countryNames = ['South Africa', 'south albania', 'North albania'];
    const countries = countryNames.map((name) => getTestBaseCurrencyInfo(name));

    it('returns all countries when the searchValue is empty', () => {
      const searchValue = '';
      const result = filterCurrencies(countries, searchValue);
      const expected = countries;
      expect(result).toEqual(expected);
    });

    it('returns matched countries when the searchValue matches', () => {
      const searchValue = 'South';
      const result = filterCurrencies(countries, searchValue);
      const expected = [countries[0], countries[1]];
      expect(result).toEqual(expected);
    });

    it('does not return any countries when the searchValue does not match', () => {
      const searchValue = 'Unique';
      const result = filterCurrencies(countries, searchValue);
      const expected: BaseCurrencyInfo[] = [];
      expect(result).toEqual(expected);
    });
  });
});
