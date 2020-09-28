import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { CurrencyActionTypes, CurrencyState } from './models';

export const initialState: CurrencyState = {
  loading: false,
  base: '',
  dateUpdated: '',
  symbol: '',
  rate: 0,
  selectedCurrency: 'ZAR', // default
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
        ...action.payload.currency,
      };
    }
    case CurrencyActionTypes.SYNC_CURRENCY_ERROR: {
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
