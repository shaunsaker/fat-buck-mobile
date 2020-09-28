import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActionType, getType } from 'typesafe-actions';
import { syncTrades, syncTradesError, syncTradesSuccess } from './actions';
import { TradesState } from './models';

export const initialState: TradesState = {
  loading: false,
  data: {},
};

const reducerActions = {
  syncTrades,
  syncTradesError,
  syncTradesSuccess,
};

export const tradesReducer: Reducer<TradesState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // FIXME: how to type this
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.trades,
        loading: false,
      };
    }
    case getType(syncTrades): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(syncTradesSuccess): {
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload.trades },
      };
    }
    case getType(syncTradesError): {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
