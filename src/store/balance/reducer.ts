import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { BalanceActionTypes, BalanceState } from './models';

export const initialState: BalanceState = {
  loading: false,
  displayBalanceAsBTC: true,
  data: {
    amount: 0,
    value: 0,
    lastUpdated: '',
  },
};

export const balanceReducer: Reducer<BalanceState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.balance,
        loading: false,
      };
    }
    case BalanceActionTypes.SYNC_BALANCE: {
      return {
        ...state,
        loading: true,
      };
    }
    case BalanceActionTypes.SYNC_BALANCE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    }
    case BalanceActionTypes.SYNC_BALANCE_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case BalanceActionTypes.SET_DISPLAY_BALANCE_AS_BTC: {
      return {
        ...state,
        displayBalanceAsBTC: action.payload.displayBalanceAsBTC,
      };
    }
    default: {
      return state;
    }
  }
};
