import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { CurrencyActionTypes, CurrencyState } from './models';

export const initialState: CurrencyState = {
  loading: false,
  selectedCurrency: 'ZAR', // default
  base: '',
  dateUpdated: '',
  symbol: '',
  rate: 0,
  id: '',
  availableCurrencies: [],
};

export const currencyReducer: Reducer<CurrencyState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.currency,
        loading: false,
      };
    }
    case CurrencyActionTypes.SYNC_CURRENCY: {
      return {
        ...state,
        loading: true,
      };
    }
    case CurrencyActionTypes.SYNC_CURRENCY_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload.currencyData,
      };
    }
    case CurrencyActionTypes.SYNC_CURRENCY_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case CurrencyActionTypes.SYNC_AVAILABLE_CURRENCIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case CurrencyActionTypes.SYNC_AVAILABLE_CURRENCIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        availableCurrencies: action.payload.availableCurrencies,
      };
    }
    case CurrencyActionTypes.SYNC_AVAILABLE_CURRENCIES_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case CurrencyActionTypes.SET_SELECTED_CURRENCY: {
      return {
        ...state,
        loading: false,
        selectedCurrency: action.payload.selectedCurrency,
      };
    }

    default: {
      return state;
    }
  }
};
