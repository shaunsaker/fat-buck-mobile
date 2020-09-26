import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActiveBotsActionTypes, ActiveBotsState } from './models';

export const initialState: ActiveBotsState = {
  loading: false,
  botIds: [],
};

export const activeBotsReducer: Reducer<ActiveBotsState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.activeBots,
        loading: false,
      };
    }
    case ActiveBotsActionTypes.SYNC_ACTIVE_BOTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActiveBotsActionTypes.SYNC_ACTIVE_BOTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        botIds: action.payload.botIds,
      };
    }
    case ActiveBotsActionTypes.SYNC_ACTIVE_BOTS_ERROR: {
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
