import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActiveBotActionTypes, ActiveBotState } from './models';

export const initialState: ActiveBotState = {
  loading: false,
  botId: '',
};

export const activeBotReducer: Reducer<ActiveBotState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.activeBot,
        loading: false,
      };
    }
    case ActiveBotActionTypes.SYNC_ACTIVE_BOT: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActiveBotActionTypes.SYNC_ACTIVE_BOT_SUCCESS: {
      return {
        ...state,
        loading: false,
        botId: action.payload.botId,
      };
    }
    case ActiveBotActionTypes.SYNC_ACTIVE_BOT_ERROR: {
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
