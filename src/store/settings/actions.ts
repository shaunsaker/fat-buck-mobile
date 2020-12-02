import { action } from 'typesafe-actions';
import { MessagingTopics } from '../messaging/models';
import { SettingsActionsTypes } from './models';

export const setMessageTopicEnabled = (
  topic: MessagingTopics,
  enabled: boolean,
) =>
  action(SettingsActionsTypes.SET_MESSAGING_TOPIC_ENABLED, {
    topic,
    enabled,
  });
