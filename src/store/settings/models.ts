import { MessagingTopics } from '../messaging/models';

export enum SettingsActionsTypes {
  SET_MESSAGING_TOPIC_ENABLED = '@@settings/SET_MESSAGING_TOPIC_ENABLED',
}

export interface SettingsState {
  messaging: {
    [key in keyof typeof MessagingTopics]: boolean;
  };
}
