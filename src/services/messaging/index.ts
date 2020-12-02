import messaging from '@react-native-firebase/messaging';

export const requestMessagingPermissionService = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const isMessagingPermissionGranted =
      (await messaging().requestPermission()) === 1; // FIXME: AuthorizationStatus is not exported

    resolve(isMessagingPermissionGranted);
  });
};

export const messagingSubscribeToTopicService = (topic: string): void => {
  messaging().subscribeToTopic(topic);
};

export const messagingUnsubscribeFromTopicService = (topic: string): void => {
  messaging().unsubscribeFromTopic(topic);
};
