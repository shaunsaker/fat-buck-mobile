export enum MessagingActionsTypes {
  REGISTER_DEVICE_FOR_REMOTE_MESSAGES = '@@messaging/REGISTER_DEVICE_FOR_REMOTE_MESSAGES',
  REQUEST_MESSAGING_PERMISSION = '@@messaging/REQUEST_MESSAGING_PERMISSION',
  MESSAGING_SUBSCRIBE_TO_TOPIC = '@@messaging/MESSAGING_SUBSCRIBE_TO_TOPIC',
}

export enum MessagingTopics {
  openedTrades = 'openedTrades',
  closedTrades = 'closedTrades',
}
