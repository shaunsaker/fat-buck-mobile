import { Reducer } from 'redux';
import { SettingsActionsTypes, SettingsState } from './models';

export const initialState: SettingsState = {
  messaging: {
    openedTradesEnabled: true,
    closedTradesEnabled: true,
  },
};

export const settingsReducer: Reducer<SettingsState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SettingsActionsTypes.SET_MESSAGING_TOPIC_ENABLED: {
      return {
        ...state,
        messaging: {
          ...state.messaging,
          [action.payload.topic]: action.payload.enabled,
        },
      };
    }
    default: {
      return state;
    }
  }
};
