import {
  setSelectedCurrency,
  syncCurrency,
  syncCurrencyError,
  syncCurrencySuccess,
} from './actions';
import { CurrencyData, CurrencyState } from './models';
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
      loading: false,
      selectedCurrency: initialState.selectedCurrency,
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
});
