import RNSnackbar from 'react-native-snackbar';
import { colors } from '../colors';
import { FONT_BOLD } from '../constants';

export const Snackbar = {
  show: (text: string) => {
    RNSnackbar.show({
      textColor: colors.black,
      backgroundColor: colors.white,
      duration: 4000,
      text,
      fontFamily: FONT_BOLD,
    });
  },
};
