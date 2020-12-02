import { ApplicationState } from '../reducers';

export const selectNotificationsOpenedTradesEnabled = (
  state: ApplicationState,
) => state.settings.notifications.openedTradesEnabled;

export const selectNotificationsClosedTradesEnabled = (
  state: ApplicationState,
) => state.settings.notifications.closedTradesEnabled;
