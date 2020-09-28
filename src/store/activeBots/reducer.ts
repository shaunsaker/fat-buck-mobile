import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActionType, getType } from 'typesafe-actions';
import {
  syncActiveBots,
  syncActiveBotsError,
  syncActiveBotsSuccess,
} from './actions';
import { ActiveBotsState } from './models';

export const initialState: ActiveBotsState = {
  loading: false,
  botIds: [],
};

const reducerActions = {
  syncActiveBots,
  syncActiveBotsSuccess,
  syncActiveBotsError,
};

export const activeBotsReducer: Reducer<ActiveBotsState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // FIXME: how to type this
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.activeBots,
        loading: false,
      };
    }
    case getType(syncActiveBots): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(syncActiveBotsSuccess): {
      return {
        ...state,
        loading: false,
        botIds: action.payload.botIds,
      };
    }
    case getType(syncActiveBotsError): {
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
