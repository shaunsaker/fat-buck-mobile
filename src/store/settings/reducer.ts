import { Reducer } from 'redux';
import { SettingsActionsTypes, SettingsState } from './models';

export const initialState: SettingsState = {
  notifications: {
    openedTradesEnabled: true,
    closedTradesEnabled: true,
  },
};

export const settingsReducer: Reducer<SettingsState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SettingsActionsTypes.SET_NOTIFICATIONS_OPENED_TRADES_ENABLED: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          openedTradesEnabled: action.payload.enabled,
        },
      };
    }
    case SettingsActionsTypes.SET_NOTIFICATIONS_CLOSED_TRADES_ENABLED: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          closedTradesEnabled: action.payload.enabled,
        },
      };
    }
    default: {
      return state;
    }
  }
};
