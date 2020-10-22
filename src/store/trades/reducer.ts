import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { TradesActionTypes, TradesState, Trade } from './models';

export const initialState: TradesState = {
  loading: false,
  data: {},
};

export const tradesReducer: Reducer<TradesState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.trades,
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
      const data = { ...state.data, ...action.payload.trades };

      // if a trade was deleted, remove it from state
      const { botId } = action.payload.trades[
        Object.keys(action.payload.trades)[0]
      ] as Trade;

      for (const tradeId in state.data) {
        if (
          state.data[tradeId].botId === botId &&
          !action.payload.trades[tradeId]
        ) {
          delete data[tradeId];
        }
      }

      return {
        ...state,
        loading: false,
        data,
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
