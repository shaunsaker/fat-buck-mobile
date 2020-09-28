import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActionType, getType } from 'typesafe-actions';
import {
  setSelectedCurrency,
  syncCurrency,
  syncCurrencyError,
  syncCurrencySuccess,
} from './actions';
import { CurrencyState } from './models';

export const initialState: CurrencyState = {
  loading: false,
  selectedCurrency: 'ZAR', // default
  base: '',
  dateUpdated: '',
  symbol: '',
  rate: 0,
  id: '',
};

const reducerActions = {
  setSelectedCurrency,
  syncCurrency,
  syncCurrencyError,
  syncCurrencySuccess,
};

export const currencyReducer: Reducer<CurrencyState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // FIXME: how to type this
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.currency,
        loading: false,
      };
    }
    case getType(syncCurrency): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(syncCurrencySuccess): {
      return {
        ...state,
        loading: false,
        ...action.payload.currency,
      };
    }
    case getType(syncCurrencyError): {
      return {
        ...state,
        loading: false,
      };
    }
    case getType(setSelectedCurrency): {
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
