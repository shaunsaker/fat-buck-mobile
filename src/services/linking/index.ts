import { Linking } from 'react-native';

export const openLinkService = (link: string) => {
  return new Promise(async (resolve, reject) => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
      resolve();
    } else {
      reject();
    }
  });
};
