import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { BalanceActionTypes, BalanceState, BalanceTypes } from './models';

export const initialState: BalanceState = {
  loading: false,
  balanceType: BalanceTypes.btc,
  data: {},
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
        data: {
          ...state.data,
          [action.payload.botId]: action.payload.balanceData,
        },
      };
    }
    case BalanceActionTypes.SYNC_BALANCE_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case BalanceActionTypes.SET_BALANCE_TYPE: {
      return {
        ...state,
        balanceType: action.payload.balanceType,
      };
    }
    default: {
      return state;
    }
  }
};
