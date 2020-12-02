export enum SettingsActionsTypes {
  SET_NOTIFICATIONS_OPENED_TRADES_ENABLED = '@@settings/SET_NOTIFICATIONS_OPENED_TRADES_ENABLED',
  SET_NOTIFICATIONS_CLOSED_TRADES_ENABLED = '@@settings/SET_NOTIFICATIONS_CLOSED_TRADES_ENABLED',
}

export interface SettingsState {
  notifications: {
    openedTradesEnabled: boolean;
    closedTradesEnabled: boolean;
  };
}
