import { action } from 'typesafe-actions';
import { SettingsActionsTypes } from './models';

export const setNotificationsOpenedTradesEnabled = (enabled: boolean) =>
  action(SettingsActionsTypes.SET_NOTIFICATIONS_OPENED_TRADES_ENABLED, {
    enabled,
  });

export const setNotificationsClosedTradesEnabled = (enabled: boolean) =>
  action(SettingsActionsTypes.SET_NOTIFICATIONS_CLOSED_TRADES_ENABLED, {
    enabled,
  });
