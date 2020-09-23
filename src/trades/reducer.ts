import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { TradesActionTypes, TradesState } from './models';

export const initialState: TradesState = {
  loading: false,
  data: [],
};

export const tradesReducer: Reducer<TradesState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        loading: false,
      };
    }
    case TradesActionTypes.SYNC_TRADES: {
      return {
        ...state,
        loading: true,
      };
    }
    case TradesActionTypes.SYNC_TRADES_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.trades,
      };
    }
    case TradesActionTypes.SYNC_TRADES_ERROR: {
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
