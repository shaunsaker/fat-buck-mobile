import {
  setSelectedCurrency,
  syncAvailableCurrencies,
  syncAvailableCurrenciesError,
  syncAvailableCurrenciesSuccess,
  syncCurrency,
  syncCurrencyError,
  syncCurrencySuccess,
} from './actions';
import { Currency, CurrencyData, CurrencyState } from './models';
import { currencyReducer, initialState } from './reducer';

describe('currency reducer', () => {
  it('sets loading to true on SYNC_CURRENCY', () => {
    const nextState = currencyReducer(initialState, syncCurrency());

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_CURRENCY_SUCCESS', () => {
    let nextState = currencyReducer(initialState, syncCurrency());
    const currencyData: CurrencyData = {
      base: 'USD',
      dateUpdated: '',
      symbol: 'AUD',
      rate: 1,
      id: 'AUD',
    };
    const expected: CurrencyState = {
      ...initialState,
      ...currencyData,
    };
    nextState = currencyReducer(nextState, syncCurrencySuccess(currencyData));

    expect(nextState).toEqual(expected);
  });

  it('sets loading to false on SYNC_CURRENCY_ERROR', () => {
    let nextState = currencyReducer(initialState, syncCurrency());
    nextState = currencyReducer(nextState, syncCurrencyError());

    expect(nextState.loading).toEqual(false);
  });

  it('sets selectedCurrency correctly', () => {
    const selectedCurrency = 'AUD';
    const nextState = currencyReducer(
      initialState,
      setSelectedCurrency(selectedCurrency),
    );

    expect(nextState.selectedCurrency).toEqual(selectedCurrency);
  });

  it('sets loading to true on SYNC_AVAILABLE_CURRENCIES', () => {
    const nextState = currencyReducer(initialState, syncAvailableCurrencies());

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_AVAILABLE_CURRENCIES_SUCCESS', () => {
    let nextState = currencyReducer(initialState, syncAvailableCurrencies());
    const availableCurrencies: Currency[] = ['USD', 'ZAR'];
    const expected: CurrencyState = {
      ...initialState,
      availableCurrencies,
    };
    nextState = currencyReducer(
      nextState,
      syncAvailableCurrenciesSuccess(availableCurrencies),
    );

    expect(nextState).toEqual(expected);
  });

  it('sets loading to false on SYNC_AVAILABLE_CURRENCIES_ERROR', () => {
    let nextState = currencyReducer(initialState, syncAvailableCurrencies());
    nextState = currencyReducer(nextState, syncAvailableCurrenciesError());

    expect(nextState.loading).toEqual(false);
  });
});
