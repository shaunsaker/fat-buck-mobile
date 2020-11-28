import messaging from '@react-native-firebase/messaging';

export const registerDeviceForRemoteMessagesService = async (): Promise<
  void
> => {
  await messaging().registerDeviceForRemoteMessages();
};

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
