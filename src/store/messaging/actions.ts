import { action } from 'typesafe-actions';
import { MessagingActionsTypes, MessagingTopics } from './models';

export const registerDeviceForRemoteMessages = () =>
  action(MessagingActionsTypes.REGISTER_DEVICE_FOR_REMOTE_MESSAGES);

export const requestMessagingPermission = () =>
  action(MessagingActionsTypes.REQUEST_MESSAGING_PERMISSION);

export const messagingSubscribeToTopic = (topic: MessagingTopics) =>
  action(MessagingActionsTypes.MESSAGING_SUBSCRIBE_TO_TOPIC, { topic });
