import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActionType, getType } from 'typesafe-actions';
import {
  setBalanceType,
  syncBalance,
  syncBalanceError,
  syncBalanceSuccess,
} from './actions';
import { BalanceState, BalanceTypes } from './models';

export const initialState: BalanceState = {
  loading: false,
  balanceType: BalanceTypes.btc,
  data: {},
};

const reducerActions = {
  syncBalance,
  syncBalanceError,
  syncBalanceSuccess,
  setBalanceType,
};

export const balanceReducer: Reducer<BalanceState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // FIXME: how to type this
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.balance,
        loading: false,
      };
    }
    case getType(syncBalance): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(syncBalanceSuccess): {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.botId]: action.payload.balance,
        },
      };
    }
    case getType(syncBalanceError): {
      return {
        ...state,
        loading: false,
      };
    }
    case getType(setBalanceType): {
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
