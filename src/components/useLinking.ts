import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/actions';

export const useLinking = () => {
  const dispatch = useDispatch();

  const openLink = useCallback(
    async (url) => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        dispatch(showSnackbar(`Don't know how to open this URL: ${url}`));
      }
    },
    [dispatch],
  );

  return {
    openLink,
  };
};
